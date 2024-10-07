<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="profile">
                <img src="profile.jpg" alt="Perfil" class="profile-img">
                <h2>Nome do Usuário</h2>
            </div>

            <!-- Select para Checker CC's na sidebar -->
            <div class="select-container">
                <label for="checker-ccs">Checker CC's:</label>
                <select id="checker-ccs" name="checker-ccs">
                    <option value="chk-oauth">CHK 0Auth</option>
                    <option value="chk-gg">CHK GG</option>
                </select>
            </div>

            <!-- Select para Checker Logins na sidebar -->
            <div class="select-container">
                <label for="checker-logins">Checker Logins:</label>
                <select id="checker-logins" name="checker-logins">
                    <option value="chk-americanas">CHK Americanas</option>
                    <option value="chk-carrefour">CHK Carrefour</option>
                    <option value="chk-amazon">CHK Amazon</option>
                    <option value="chk-drogasil">CHK Drogasil</option>
                    <option value="chk-facebook">CHK Facebook</option>
                    <option value="chk-hotmail">CHK Hotmail</option>
                    <option value="chk-renner">CHK Renner</option>
                </select>
            </div>

            <!-- Elemento para mostrar o crédito -->
            <div class="credit-container">
                Saldo disponível: <span>$500,00</span>
            </div>
        </div>

        <!-- Conteúdo principal -->
        <div class="main-content">
            <header class="header">
                <h1>Bem-vindo ao Painel</h1>
                <p>Agora você pode selecionar os Checkers diretamente na barra lateral.</p>
            </header>

            <!-- Grade de conteúdo -->
            <div class="content-grid">
                <div class="card">
                    <h3>Informação 1</h3>
                    <p>Detalhes da informação 1.</p>
                </div>
                <div class="card">
                    <h3>Informação 2</h3>
                    <p>Detalhes da informação 2.</p>
                </div>
                <div class="card">
                    <h3>Informação 3</h3>
                    <p>Detalhes da informação 3.</p>
                </div>
                <div class="card">
                    <h3>Informação 4</h3>
                    <p>Detalhes da informação 4.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
