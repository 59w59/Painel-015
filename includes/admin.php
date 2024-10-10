// includes/admin_check.php
<?php
session_start();
include 'db.php';

function verificarAdmin() {
    global $pdo;
    if (!isset($_SESSION['user_id'])) {
        header('Location: login.php');
        exit;
    }
    $stmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();
    return $user && $user['role'] === 'admin';
}
?>
