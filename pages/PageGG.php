<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/GG.css">
    <title>Checker Layout</title>
</head>
<body>
    <div class="dashboard">
        <h2>Menu</h2>
        <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Carregar Checker</a></li>
            <li><a href="#">Histórico</a></li>
            <li><a href="#">Configurações</a></li>
            <li><a href="#">Suporte</a></li>
        </ul>
    </div>
    <div class="container">
        <div class="checker">
            <textarea id="input-text" placeholder="Cole ou carregue o arquivo .txt com as linhas aqui..." rows="20"></textarea>
            <div class="controls">
                <button id="start-check" class="control-button">Iniciar</button>
                <button id="settings" class="control-button">Configurações</button>
            </div>
        </div>
        <div class="results">
            <div class="result" id="live">
                <span>Live</span>
                <span class="count">0</span>
            </div>
            <div class="result" id="die">
                <span>Die</span>
                <span class="count">0</span>
            </div>
            <div class="result" id="unknown">
                <span>Unknown</span>
                <span class="count">0</span>
            </div>
        </div>
        <div class="detailed-results">
            <div class="details" id="live-details">
                <h3>Live Results</h3>
                <pre id="live-list"></pre>
            </div>
            <div class="details" id="die-details">
                <h3>Die Results</h3>
                <pre id="die-list"></pre>
            </div>
            <div class="details" id="unknown-details">
                <h3>Unknown Results</h3>
                <pre id="unknown-list"></pre>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
