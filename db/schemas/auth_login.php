<?php
require ('../connection/db.php');

$user = $_GET['user'] ?? '';
$senha = $_GET['senha'] ?? '';

if ($user && $senha) {
    $sql = "SELECT * FROM users WHERE user = ? and passw = ?";
    $stmt = $conexao->prepare($sql);

    if ($stmt === false) {
        die(json_encode(['error' => "Falha ao preparar as instancias:" . $conexao->error]));
    }

    $stmt->bind_param("ss", $user, $senha);
    $stmt->execute();
    $result = $stmt->get_result();

    $response = ['exists' => $result->num_rows > 0];
    
    $stmt->close();
} else {
    $response = ['error' => "Parametro nao inseridos corretamente"];
}

$conexao->close();
echo json_encode($response);

?>