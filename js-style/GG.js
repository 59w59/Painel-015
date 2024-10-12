function sendToGGreq(lines) {
    // Enviar os dados para GGreq.js
    fetch('http://localhost:3000/test-card', { // URL do GGreq.js
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cc: lines }) // Enviando as linhas para serem testadas
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Erro ao testar cartões: ' + data.error);
            return;
        }
        console.log(data); // Exibir os resultados dos testes no console para depuração
        // Você pode adicionar lógica aqui para atualizar a interface com base nos resultados recebidos
    })
    .catch(error => {
        console.error('Erro ao enviar para GGreq.js:', error);
    });
}
