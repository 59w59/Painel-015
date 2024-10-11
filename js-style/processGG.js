<?php
header('Content-Type: application/json');

// Verifica se o conteúdo JSON foi enviado
$input = json_decode(file_get_contents('php://input'), true);
if ($input === null || !isset($input['lines'])) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Dados de entrada inválidos. Certifique-se de enviar um JSON válido com o campo "lines".'
    ]);
    exit;
}

$lines = $input['lines'];

// Inicializa os arrays para os resultados
$live = [];
$die = [];
$unknown = [];

// Função para enviar requisições à API externa (substitua pela URL real da API)
function enviarParaAPI($line) {
    $url = 'https://url-da-api.com/verificar'; // Substitua pela URL real da API

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['line' => $line]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Processa cada linha
foreach ($lines as $line) {
    $result = enviarParaAPI($line);
    
    if ($result && isset($result['status'])) {
        switch (strtolower($result['status'])) {
            case 'live':
                $live[] = $line;
                break;
            case 'die':
                $die[] = $line;
                break;
            default:
                $unknown[] = $line;
                break;
        }
    } else {
        $unknown[] = $line;
    }
}

// Retorna os resultados
echo json_encode([
    'liveCount' => count($live),
    'dieCount' => count($die),
    'unknownCount' => count($unknown),
    'live' => $live,
    'die' => $die,
    'unknown' => $unknown
]);
