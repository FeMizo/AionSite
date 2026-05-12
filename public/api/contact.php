<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://aionsite.com.mx');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$input   = json_decode(file_get_contents('php://input'), true);
$name    = trim($input['name']    ?? '');
$email   = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = trim($input['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos requeridos.']);
    exit;
}
if (mb_strlen($name) > 100 || mb_strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos.']);
    exit;
}

require __DIR__ . '/_smtp.php';
$cfg = require __DIR__ . '/smtp_config.php';

$safeName    = htmlspecialchars($name);
$safeMessage = nl2br(htmlspecialchars($message));

$subject = 'Nuevo mensaje de ' . $safeName . ' desde el sitio';
$html    = '
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#1e40af">Nuevo mensaje desde el sitio</h2>
  <p><strong>Nombre:</strong> ' . $safeName . '</p>
  <p><strong>Correo:</strong> ' . htmlspecialchars((string)$email) . '</p>
  <p><strong>Mensaje:</strong></p>
  <p style="background:#f1f5f9;padding:16px;border-radius:8px">' . $safeMessage . '</p>
</div>';

if (!smtp_send($cfg, (string)$email, $subject, $html)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo enviar. Intenta de nuevo.']);
    exit;
}

echo json_encode(['ok' => true]);
