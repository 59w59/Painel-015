<!DOCTYPE html>
<html lang="pt-BR">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Inicio | CentralZero </title>
    <link rel="stylesheet" href="../../css/landing-page.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>
<body>


    <?php require '../../js-style/modalsInfos.php'; ?>
    <?php require '../../js-style/modalPay.php'; ?>

    <!-- Navbar -->
    <div class="navbar-container">
        <div class="navbar">
            <div class="menu-toggle" id="mobile-menu">
                <i class="fas fa-bars"></i> <!-- Ícone do menu de hamburguer -->
            </div>
            <ul class="nav-list">
                <li><a href="#inicio"> Início </a></li>
                <li><a href="#recursos"> Recursos </a></li>
                <li><a href="#precos"> Planos </a></li>
                <li><a href="#sobre"> Sobre </a></li>
                <li><a href="#contato"> Contato </a></li>
                
            </ul>

            <div class="commands-button">
                    <a href="../authLogin.php" class="btn"> Login </a>
            </div>
            
        
        </div>
    </div>

    <!-- Seção de Hero -->
    <div class="hero-section" id="inicio">
        <div class="hero-content">

            <h1> Bem-vindo a CentralZero </h1>
            <p> Evite dor de cabeça ao testar manualmente coisas que poderiam ser testadas automaticamente. </p>
        
        </div>
    </div>

    <!-- Seção de Recursos -->
    
    <div class="features-section" id="recursos">
        <h2>Transforme Seu Negócio com a CentralZero</h2>
        <div class="features-grid">
            <div class="feature-item">
                <img src="../../image/note.png" alt="Icone 1">
                <h3>Estabilidade Imbatível</h3>
                <p>Desenvolvido para proporcionar máxima estabilidade, nosso Central 015 opera sem falhas, garantindo uma experiência de usuário contínua e livre de interrupções.</p>
            </div>
            <div class="feature-item">
                <img src="../../image/Chat.png" alt="Icone 2">
                <h3>Otimização Contínua</h3>
                <p>Com atualizações regulares e melhorias constantes, nosso Central 015 se adapta às suas necessidades, oferecendo sempre o melhor desempenho.</p>
            </div>
            <div class="feature-item">
                <img src="../../image/cursor.png" alt="Icone 3">
                <h3>Suporte 24 Horas</h3>
                <p>Estamos sempre prontos para ajudar! Com suporte disponível 24/7, você pode resolver qualquer problema rapidamente e sem complicações.</p>
            </div>
            
        </div>
    </div>
    <div class="sep"></div>

    <!-- Seção de Preços -->
    <div class="pricing-section" id="precos">
        <h2>Planos e Preços</h2>
        <div class="pricing-cards">
            <div class="pricing-card">
                <h3> Plano Diario </h3>
                <div class="price"> R$70 </div>
                

                <ul>
                    <li> Suporte 24H </li>
                    <li> Ativação Imediata </li>
                    <li> Sem limitação de Checagem </li>
                </ul>

                <a id="planOne" href="#"> Assinar </a>
                
            </div>
            <div class="pricing-card">
                <h3> Plano Semanal </h3>
                <div class="price"> R$250 </div>
                

                <ul>
                    <li> Suporte 24H </li>
                    <li> Ativação Imediata </li>
                    <li> Sem limitação de Checagem </li>
                </ul>

                <a id="planTwo" href="#"> Assinar </a>

            </div>
            <div class="pricing-card">
                <h3> Plano Mensal </h3>
                <div class="price"> R$740 </div>
                

                <ul>
                    <li> Suporte 24H </li>
                    <li> Ativação Imediata </li>
                    <li> Sem limitação de Checagem </li>
                </ul>

                <a id="planThree" href="#"> Assinar </a>

            </div>
        </div>
    </div>
    <div class="sep"></div>

    <!-- Seção Sobre Mim -->
    <div class="about-section" id="sobre">
       
        <div class="about-content">
            <div class="about-text">
                <h3> CentralZero -  Inovação e Excelência </h3>
                <p>Fundada em 2024, a Cbotz começou como uma visão empreendedora, evoluindo rapidamente para uma equipe independente de desenvolvimento. Desde então, ampliamos nosso alcance, aceitando uma variedade de projetos desafiadores e enriquecedores.</p>
                <p>Especializados em software, jogos e soluções web, nossa missão é entregar produtos de alta qualidade que atendam e superem as expectativas de nossos clientes. Com um compromisso inabalável com a excelência e a inovação, buscamos sempre entregar resultados que fidelizem nossos clientes e estabeleçam padrões elevados no mercado.</p>
                <p>Missão: Garantir a entrega de projetos excepcionais com qualidade superior, utilizando práticas inovadoras e mantendo um atendimento ágil e eficaz. Nosso objetivo é não apenas atender, mas superar as expectativas dos nossos clientes, proporcionando uma experiência de excelência.</p>
            </div>
            <div class="about-image">
                <img src="../../image/logo_central015.png" class="resurgindo" alt="Logo Cbotz">
            </div>
        </div>
    </div>
    <div class="sep"></div>



    <div class="contact-section" id="contato">
        <h2>Entre em Contato</h2>
        <div class="contact-grid">

            <div class="contact-item">
                <a href="https://wa.me/5519981860549" target="_blank">
                    <i style="font-size: 40px;" class="whats fa-brands fa-whatsapp"></i>
                    
                </a>
            </div>

            <div class="contact-item">
                <a href="https://discord.gg/seulinkdiscord" target="_blank">
                    <i style="font-size: 40px;" class="discord fa-brands fa-discord"></i>
                    
                </a>
            </div>

            <div class="contact-item">
                <a href="https://web.telegram.org/k/#@yashirocoder target="_blank">
                    <i style="font-size: 40px;" class="telegram fa-brands fa-telegram"></i>
                    
                </a>
            </div>

        </div>
    </div>


    <div class="footer-section">
        <p>&copy; 2024 CentralZero - Todos os direitos reservados. </p>
    </div>

   <script src="../../js-style/modalsInfos.js"></script>
   <script src="../../js-style/modalsPay.js"></script>
   <script src="../../js-style/reqMercadopago.js"></script>
   <script src="../../js-style/menuToggle.js"></script>

</body>
</html>