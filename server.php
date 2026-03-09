<?php
/**
 * Development Server Router
 * Serves files from both backend and plain-html-version folders
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// API requests go to backend
if (strpos($uri, '/api/') === 0) {
    $file = __DIR__ . '/backend' . $uri;
    if (file_exists($file)) {
        return false; // Let PHP handle it
    }
}

// Backend files (login, register, dashboards, etc.)
$backendFile = __DIR__ . '/backend' . $uri;
if (file_exists($backendFile) && !is_dir($backendFile)) {
    return false; // Serve from backend
}

// Plain HTML version files
$plainFile = __DIR__ . $uri;
if (file_exists($plainFile) && !is_dir($plainFile)) {
    return false; // Serve from root
}

// Default routes
if ($uri === '/' || $uri === '') {
    require __DIR__ . '/backend/index.html';
    return true;
}

// 404
http_response_code(404);
echo "404 - File not found: " . htmlspecialchars($uri);
return true;
