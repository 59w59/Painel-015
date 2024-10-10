<?php
session_start();
include '../includes/header.php';
include '../includes/sidebar.php';

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: authLogin.php');
    exit;
}
?>

<div class="content">
    <div class="navbar">
        <ul>
            <li><a href="userDashboard.php">Dashboard</a></li>
            <li><a href="profile.php">Perfil</a></li>
            <li><a href="logout.php">Sair</a></li>
        </ul>
    </div>

    <div class="hero-section">
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Gerencie suas tarefas e acompanhe seu progresso.</p>
    </div>

    <div class="section-features">
        <h2>Funcionalidades</h2>
        <div class="feature-cards">
            <div class="card">
                <h3>Checker Amazon</h3>
                <p>Automação e verificação para Amazon.</p>
                <a href="/checker/amazon.php" class="btn">Acessar</a>
            </div>
            <div class="card">
                <h3>Checker Drogasil</h3>
                <p>Automação e verificação para Drogasil.</p>
                <a href="/checker/drogasil.php" class="btn">Acessar</a>
            </div>
            <div class="card">
                <h3>Checker Renner</h3>
                <p>Automação e verificação para Renner.</p>
                <a href="/checker/renner.php" class="btn">Acessar</a>
            </div>
        </div>
    </div>

    <div class="section-contact">
        <h2>Contato</h2>
        <p>Em caso de dúvidas, entre em contato com o suporte.</p>
    </div>
</div>

<?php include '../includes/footer.php'; ?>
