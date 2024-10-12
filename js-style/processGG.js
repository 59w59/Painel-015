function sendToGGreq(lines) {
    fetch('http://localhost:3000/test-card', {
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
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao enviar para GGreq.js:', error);
        alert('Falha ao conectar ao servidor. Verifique se o servidor está ativo e tente novamente.');
    });
}

function checkLines(lines) {
    fetch('process.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lines: lines })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert('Erro: ' + data.error);
            return;
        }
        document.getElementById('live').querySelector('.count').textContent = data.liveCount;
        document.getElementById('die').querySelector('.count').textContent = data.dieCount;
        document.getElementById('unknown').querySelector('.count').textContent = data.unknownCount;

        document.getElementById('live-list').textContent = data.live.join('\n');
        document.getElementById('die-list').textContent = data.die.join('\n');
        document.getElementById('unknown-list').textContent = data.unknown.join('\n');

        sendToGGreq(lines);
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Falha ao processar as linhas. Verifique se o servidor está ativo e tente novamente.');
    });
}