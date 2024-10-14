<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Dashboard | CentralZero </title>
    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>
<body>

    <div class="sidebar">
        
        <ul>

            <li><a class="textList" href="#"><i class="fas fa-home"></i><span class="sidebar-text"> Inicio </span></a></li>
            <li><a class="textList" href="#"><i class="fas fa-user"></i><span class="sidebar-text"> Conta </span></a></li>
            <li><a class="textList" href="#"><i class="fa-solid fa-ranking-star"></i><span class="sidebar-text"> Rank </span></a></li>
            <li><a class="textList" href="#"><i class="fa-solid fa-gear"></i><span class="sidebar-text">Checkers Logins</span></a></li>
            <li><a class="textList" href="#"><i class="fa-solid fa-gear"></i><span class="sidebar-text"> Checkers CC </span></a></li>
        
        </ul>
    </div>


    
    <div class="main-content">
        <h1> CentralZero - Dashboard </h1>

        <div class="cards">
            <div class="card">
                <h3> Sua Assinatura </h3>
                <p> Data de Expiração: {date} </p>
                <p> Plano: {plan} </p>
                <button> Renovar Assinatura </button>
            </div>

            <div class="card">
                <h3> Estatisticas do Usuario </h3>
                <p> Rank: {rank} </p>
                <p> Total de Lives: {lives} </p>
                <p> Total de Dies: {dies} </p>
                
            </div>

        </div>


    </div>

</body>
</html>