const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('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'); // Substitua pela sua chave secreta do Stripe

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/verificar-cartao', async (req, res) => {
    const { stripeToken } = req.body;

    if (!stripeToken) {
        return res.status(400).json({ code: 400, message: 'Token do Stripe não fornecido.' });
    }

    try {
        // Faz uma cobrança de teste de R$ 1,00 para verificar o cartão
        const charge = await stripe.charges.create({
            amount: 100, // Valor em centavos (R$ 1,00)
            currency: 'brl',
            source: stripeToken,
            description: 'Verificação de cartão',
        });

        // Retorna uma resposta de sucesso com informações detalhadas da cobrança
        res.status(200).json({ code: 200, message: 'Cartão validado com sucesso!', charge });
    } catch (error) {
        console.error('Erro ao verificar o cartão:', error);

        // Preparar a resposta de erro com informações adicionais
        let errorResponse = { code: 500, message: 'Erro ao verificar o cartão: ' + error.message };

        // Verificar se é um erro do Stripe e se possui declined_code
        if (error.type === 'StripeCardError') {
            errorResponse.code = 400; // Erro de cartão deve retornar 400 (Bad Request)
            errorResponse.message = 'Erro com o cartão: ' + error.message;
            if (error.decline_code) {
                errorResponse.declined_code = error.decline_code;
            }
        } else if (error.type === 'StripeInvalidRequestError') {
            errorResponse.code = 400; // Erro de requisição deve retornar 400
            errorResponse.message = 'Erro na requisição: ' + error.message;
        } else if (error.type === 'StripeAPIError') {
            errorResponse.code = 500; // Erro da API Stripe deve retornar 500 (Internal Server Error)
            errorResponse.message = 'Erro na API do Stripe: ' + error.message;
        }

        // Enviar a resposta com informações de erro
        res.status(errorResponse.code).json(errorResponse);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
