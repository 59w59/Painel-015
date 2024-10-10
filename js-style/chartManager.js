// js-style/script.js

// Dados para o gráfico de linha
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: 'Desempenho',
            data: [10, 15, 20, 25, 30, 35, 40, 45],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true
    }
});

// Dados para o gráfico de barras
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: 'Pedidos',
            data: [5, 10, 15, 20, 25, 30, 35, 40],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});
