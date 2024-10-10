<?php
session_start();
include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verificar login no banco de dados
    $userId = verificarLogin($username, $password);

    if ($userId) {
        // Login bem-sucedido
      $_SESSION['user_id'] = $userId;
      header('Location: /Site/pages/userDashboard.php');
    exit;        
    } else {
        // Credenciais inválidas
        echo "Usuário ou senha inválidos.";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Central 015</title>
    <link rel="stylesheet" href="../css/auth.css">
</head>
<body>
    <div class="login-page">
        <!-- Seção do Formulário de Login -->
        <div class="login-form-section">
            <form action="authLogin.php" method="POST" class="login-form">
                <h2>LOGIN</h2>
                <p>Como começar? Insira seu usuário e senha para continuar</p>
                <div class="input-group">
                    <label for="username"><i class="fas fa-user"></i> Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password"><i class="fas fa-lock"></i> Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn-login">Login</button>
            </form>
        </div>

        <!-- Seção com a Imagem da Logo -->
        <div class="login-image-section">
            <div class="image-content">
                <img src="../image/logo_central015.png" alt="Logo Sistema X">
                <p>Boas oportunidades estão esperando por você ao fazer login agora!</p>
            </div>
        </div>
    </div>
</body>
</html>
