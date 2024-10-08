<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificação de Cartão de Crédito</title>
</head>
<body>
    <h1>Verificação de Cartão de Crédito</h1>
    <form id="payment-form">
        <input type="text" name="card_number" placeholder="Número do Cartão" value="5576920055137782"><br>
        <input type="text" name="exp_month" placeholder="Mês de Expiração" value="01"><br>
        <input type="text" name="exp_year" placeholder="Ano de Expiração" value="25"><br>
        <input type="text" name="cvc" placeholder="CVC" value="591"><br>
        <button type="submit">Verificar Cartão</button>
    </form>

    <p id="result"></p>

    <script>
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            
            const cardData = {
                number: formData.get('card_number'),
                exp_month: formData.get('exp_month'),
                exp_year: formData.get('exp_year'),
                cvc: formData.get('cvc')
            };

            try {
                const response = await fetch('http://localhost:3000/verify-card', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cardData)
                });

                const result = await response.json();
                const resultElement = document.getElementById('result');

                if (result.success) {
                    resultElement.textContent = 'Cartão validado com sucesso: ' + JSON.stringify(result.charge_details);
                    resultElement.style.color = 'green';
                } else {
                    resultElement.textContent = 'Erro ao verificar o cartão: ' + result.message;
                    resultElement.style.color = 'red';
                }
            } catch (error) {
                document.getElementById('result').textContent = 'Erro ao verificar o cartão.';
            }
        });
    </script>
</body>
</html>