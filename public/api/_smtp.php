<?php
/**
 * Minimal SMTP sender — STARTTLS on port 587, no Composer required.
 */
function smtp_send(array $cfg, string $replyTo, string $subject, string $html): bool {
    $sock = @fsockopen($cfg['host'], $cfg['port'], $errno, $errstr, 15);
    if (!$sock) return false;

    $r = fn() => (string) fgets($sock, 512);
    $w = fn(string $s) => fwrite($sock, $s . "\r\n");

    $r(); // 220 greeting

    $w('EHLO aionsite.com.mx');
    while ($l = $r()) { if (isset($l[3]) && $l[3] === ' ') break; }

    $w('STARTTLS');
    $r(); // 220 Go ahead
    stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);

    $w('EHLO aionsite.com.mx');
    while ($l = $r()) { if (isset($l[3]) && $l[3] === ' ') break; }

    $w('AUTH LOGIN');
    $r();
    $w(base64_encode($cfg['user']));
    $r();
    $w(base64_encode($cfg['pass']));
    $resp = $r();
    if (!str_starts_with($resp, '235')) { fclose($sock); return false; }

    $w("MAIL FROM:<{$cfg['user']}>");
    $r();
    $w("RCPT TO:<{$cfg['to']}>");
    $r();
    $w('DATA');
    $r(); // 354

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $msg  = "From: AionSite <{$cfg['user']}>\r\n";
    $msg .= "To: {$cfg['to']}\r\n";
    $msg .= "Reply-To: {$replyTo}\r\n";
    $msg .= "Subject: {$encodedSubject}\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/html; charset=UTF-8\r\n";
    $msg .= "\r\n" . $html . "\r\n.";
    $w($msg);
    $r(); // 250

    $w('QUIT');
    fclose($sock);
    return true;
}
