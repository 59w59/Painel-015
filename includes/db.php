<?php
// includes/db.php - Conexão com o Banco de Dados usando variáveis de ambiente ou valores padrão

// Configuração do banco de dados
$host = getenv('DB_HOST') ?: 'localhost';
$db = getenv('DB_NAME') ?: 'painel_checkers';
$user = getenv('DB_USER') ?: 'admin';
$pass = getenv('DB_PASS') ?: '1234';

// Função para conectar ao banco de dados
function conectarBanco() {
    global $host, $db, $user, $pass;
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Erro de conexão com o banco de dados: " . $e->getMessage());
        die("Erro de conexão. Tente novamente mais tarde.");
    }
}

// Função para verificar login no banco de dados
function verificarLogin($username, $password) {
    $pdo = conectarBanco();
    $stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Login válido
        return $user['id'];
    }
    // Login inválido
    return false;
}
?>
