<aside class="sidebar">
    <div class="profile-section">
        <img src="../image/logo_central.png" alt="Profile Picture" class="profile-pic"> <!-- Imagem de perfil -->
        <h2><?php echo $_SESSION['usuario']; ?></h2>
    </div>

    <nav class="menu">
        <ul>
            <li><a href="#">Opção 1</a></li>
            <li><a href="#">Opção 2</a></li>
            <li><a href="#">Opção 3</a></li>
            <li><a href="#">Opção 4</a></li>
        </ul>
    </nav>

    <div class="logout-section">
        <a href="../pages/logout.php" class="logout-btn">Logout</a> <!-- Caminho correto para logout -->
    </div>
</aside>
