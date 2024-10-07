<?php
$host = 'localhost';
$db = 'tarefas_db';  // Nome do banco de dados que você criou no phpMyAdmin
$user = 'root';      // Usuário padrão do MySQL no XAMPP
$pass = '';          // Senha padrão é vazia no XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}
?>
