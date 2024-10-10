<!-- includes/sidebar.php -->
<div class="sidebar">
    <a href="/dashboard.php">Dashboard</a>
    <?php if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin'): ?>
        <a href="/admin_painel.php">Painel Admin</a>
    <?php endif; ?>
    <a href="/perfil.php">Perfil do Usuário</a>
    <a href="/logout.php">Logout</a>
</div>
