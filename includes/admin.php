<?php
include 'includes/db.php';
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Buscar o papel (role) do usuário logado
$stmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

// Verificar se o usuário é um administrador
if ($user['role'] !== 'admin') {
    echo "Acesso negado. Você não tem permissão para acessar esta página.";
    exit;
}
?>
