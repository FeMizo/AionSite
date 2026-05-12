<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://aionsite.com.mx');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$input = json_decode(file_get_contents('php://input'), true);
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Correo inválido.']);
    exit;
}

require __DIR__ . '/_smtp.php';
$cfg = require __DIR__ . '/smtp_config.php';

$subject = 'Nuevo registro al newsletter — ' . $email;
$html    = '
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#1e40af">Nuevo registro al newsletter (popup)</h2>
  <p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>
  <p style="color:#64748b;font-size:14px">
    Este usuario quiere ser avisado del lanzamiento del dashboard el 18 de mayo de 2026.
  </p>
</div>';

if (!smtp_send($cfg, $email, $subject, $html)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo enviar. Intenta de nuevo.']);
    exit;
}

echo json_encode(['ok' => true]);
