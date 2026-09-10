<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://aionsite.com.mx');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/meta_capi_config.php';
if (!is_file($configPath)) {
    http_response_code(503);
    echo json_encode(['error' => 'Conversions API is not configured.']);
    exit;
}

$config = require $configPath;
$pixelId = trim((string)($config['pixel_id'] ?? ''));
$accessToken = trim((string)($config['access_token'] ?? ''));
$pageId = trim((string)($config['page_id'] ?? ''));
$messagingChannel = trim((string)($config['messaging_channel'] ?? 'WHATSAPP'));

if (!$pixelId || !$accessToken || str_contains($accessToken, 'PASTE_')) {
    http_response_code(503);
    echo json_encode(['error' => 'Conversions API credentials are incomplete.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$eventName = trim((string)($input['event_name'] ?? 'Contact'));
$eventId = trim((string)($input['event_id'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$phone = trim((string)($input['phone'] ?? ''));
$sourceUrl = trim((string)($input['event_source_url'] ?? ''));
$sourceHost = parse_url($sourceUrl, PHP_URL_HOST);
$eventSourceUrl = $sourceHost === 'aionsite.com.mx' ? $sourceUrl : 'https://aionsite.com.mx/';

if (!in_array($eventName, ['Contact', 'LeadSubmitted'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Unsupported event.']);
    exit;
}
if (!$eventId || mb_strlen($eventId) > 128) {
    http_response_code(400);
    echo json_encode(['error' => 'Event ID is required.']);
    exit;
}

$userData = array_filter([
    'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
    'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
    'fbp' => $_COOKIE['_fbp'] ?? null,
    'fbc' => $_COOKIE['_fbc'] ?? null,
]);
if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $userData['em'] = [hash('sha256', strtolower($email))];
}
if ($phone) {
    $digits = preg_replace('/\D+/', '', $phone);
    if ($digits) $userData['ph'] = [hash('sha256', $digits)];
}

$event = [
    'event_name' => $eventName,
    'event_time' => time(),
    'event_id' => $eventId,
    'action_source' => 'website',
    'event_source_url' => $eventSourceUrl,
    'user_data' => $userData,
    'custom_data' => array_merge(
        ['messaging_channel' => $messagingChannel, 'page_id' => $pageId],
        array_intersect_key((array)($input['custom_data'] ?? []), array_flip(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'])),
    ),
];

$url = 'https://graph.facebook.com/v26.0/' . rawurlencode($pixelId) . '/events?access_token=' . rawurlencode($accessToken);
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode(['data' => [$event]], JSON_UNESCAPED_SLASHES),
    CURLOPT_TIMEOUT => 8,
]);
$response = curl_exec($ch);
$status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode(['error' => 'Meta rejected the event.']);
    exit;
}
echo json_encode(['ok' => true]);
