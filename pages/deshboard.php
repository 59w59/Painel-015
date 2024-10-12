<?php
// Set the content type to HTML with UTF-8 encoding to ensure proper character display
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    <title>Dashboard</title>
</head>
<body>
    <div class="sidebar">
        <h2>CentralZero</h2>
        <ul>
            <!-- Sidebar menu items -->
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Checker 0auth</a></li>
            <li><a href="PageGG.php">Checker GG</a></li>
            <br><h2>Checker de logins</h2>
            <li><a href="#">Checker renner</a></li>
            <li><a href="#">Checker drogasil</a></li>
            <li><a href="#">Checker amazon</a></li>
            <li><a href="#">Checker Americanas</a></li>
            <li><a href="#">Checker Americanas vales</a></li>
            <li><a href="#">Checker Carrefour</a></li>
            <br><h2></h2>
            <li><a href="#">Histórico</a></li>
            <li><a href="#">Configurações</a></li>
            <li><a href="#">Suporte</a></li>
        </ul>
    </div>
    <div class="main-content">
        <div class="content-box">
            <h3>Dashboard Central</h3>
            <div class="stats">
                <?php
                // Example data - replace these with values from your database or other sources
                $totalCompras = 150; // Total number of people who have made a purchase
                $usuariosAtivos = 75; // Total number of active users currently using the site
                ?>
                <div class="stat">
                    <!-- Display total purchases -->
                    <h4><?php echo $totalCompras; ?></h4>
                    <p>Pessoas que já compraram</p>
                </div>
                <div class="stat">
                    <!-- Display active users -->
                    <h4><?php echo $usuariosAtivos; ?></h4>
                    <p>Pessoas utilizando o site</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>