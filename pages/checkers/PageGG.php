<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/GG.css">
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,0"
    />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <script src="https://unpkg.com/akar-icons-fonts"></script>
    <title>Checker Layout</title>
</head>
<body>
    <div class="dashboard">
        <h2>Menu</h2>
        <ul>
            <li><a href="deshboard.php">Início</a></li>
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
    <!-- Incluindo GG.js para integração com o backend -->
    <script src="../../js-style/GG.js"></script>
    <script>
        document.getElementById('start-check').addEventListener('click', function() {
            const inputText = document.getElementById('input-text').value.trim();
            if (inputText) {
                const lines = inputText.split('\n');
                fetch('http://localhost:8080/api/check-card', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cc: lines })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        alert('Erro ao testar cartões: ' + data.error);
                        return;
                    }
                    document.getElementById('live').querySelector('.count').textContent = data.filter(result => result.status === 'LIVE').length;
                    document.getElementById('die').querySelector('.count').textContent = data.filter(result => result.status === 'DIE').length;
                    document.getElementById('unknown').querySelector('.count').textContent = data.filter(result => result.status === 'UNKNOWN').length;

                    document.getElementById('live-list').textContent = data.filter(result => result.status === 'LIVE').map(result => result.message).join('\n');
                    document.getElementById('die-list').textContent = data.filter(result => result.status === 'DIE').map(result => result.message).join('\n');
                    document.getElementById('unknown-list').textContent = data.filter(result => result.status === 'UNKNOWN').map(result => result.message).join('\n');
                })
                .catch(error => {
                    ('Erro ao enviar para API:', error);
                    alert('Falha ao conectar ao servidor. Verifique se o servidor está ativo e tente novamente.');
                });
            } else {
                alert('Por favor, insira algum texto para verificar.');
            }
        });
    </script>
</body>
</html>