<?php
include 'includes/db.php';
session_start();

// Verificar se o usuário é administrador
$stmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

if ($user['role'] !== 'admin') {
    echo "Acesso negado.";
    exit;
}

// Buscar todos os usuários
$stmt = $pdo->prepare("SELECT id, username, role FROM users");
$stmt->execute();
$users = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel Admin - Gerenciar Usuários</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="content">
    <h1>Gerenciar Usuários</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome de Usuário</th>
                <th>Papel</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
            <tr>
                <td><?php echo $user['id']; ?></td>
                <td><?php echo $user['username']; ?></td>
                <td><?php echo $user['role']; ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

</body>
</html>
