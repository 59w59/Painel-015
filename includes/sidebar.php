<?php
// Buscar o papel (role) do usuário logado
$stmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();
?>

<div class="sidebar">
    <h2>Checker</h2>
    <ul>
        <!-- Itens acessíveis a todos os usuários -->
        <li><a href="chk_cc_full.php">Chk CC full</a></li>
        <li><a href="chk_gg.php">Chk GG</a></li>
        <li><a href="amazon.php">Amazon</a></li>

        <!-- Itens acessíveis apenas para administradores -->
        <?php if ($user['role'] === 'admin'): ?>
            <li><a href="admin_panel.php">Painel Admin</a></li>
        <?php endif; ?>

        <!-- Itens acessíveis para editores e administradores -->
        <?php if ($user['role'] === 'editor' || $user['role'] === 'admin'): ?>
            <li><a href="editor_tools.php">Ferramentas do Editor</a></li>
        <?php endif; ?>
    </ul>
</div>
