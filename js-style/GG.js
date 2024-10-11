document.getElementById('start-check').addEventListener('click', function() {
    let inputText = document.getElementById('input-text').value;
    if (inputText.trim() === '') {
        alert('Por favor, insira algum texto ou carregue um arquivo .txt.');
        return;
    }

    // Divida o texto em linhas
    let lines = inputText.split('\n').map(line => line.trim()).filter(line => line !== '');

    // Envia as linhas para o PHP processar
    checkLines(lines);
});

function checkLines(lines) {
    // Enviar os dados para o PHP processar
    fetch('process.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lines: lines })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Erro: ' + data.error);
            return;
        }
        // Atualizar os contadores na interface
        document.getElementById('live').querySelector('.count').textContent = data.liveCount;
        document.getElementById('die').querySelector('.count').textContent = data.dieCount;
        document.getElementById('unknown').querySelector('.count').textContent = data.unknownCount;

        // Exibir os detalhes dos resultados
        document.getElementById('live-list').textContent = data.live.join('\n');
        document.getElementById('die-list').textContent = data.die.join('\n');
        document.getElementById('unknown-list').textContent = data.unknown.join('\n');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
