const express = require('express');
const cors = require('cors'); // Adiciona o suporte a CORS
const stripe = require('stripe')('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'); // Substitua com sua chave secreta de produção
const app = express();

app.use(cors()); // Habilita CORS para permitir requisições do site PHP
app.use(express.json()); // Middleware para parsear JSON

// Endpoint para verificar o cartão
app.post('/verify-card', async (req, res) => {
  const { number, exp_month, exp_year, cvc } = req.body;

  try {
    // Criar um token de cartão usando os detalhes fornecidos
    const token = await stripe.tokens.create({
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
    });

    // Realizar uma cobrança de valor mínimo para validar o cartão
    const charge = await stripe.charges.create({
      amount: 100, // Valor de 1 USD (100 cents) para validação do cartão
      currency: 'usd',
      source: token.id,
      description: 'Verificação de cartão',
    });

    // Retornar resposta de sucesso se o cartão for validado
    res.json({
      success: true,
      message: 'Cartão validado com sucesso',
      charge_details: charge, // Dados da transação
    });

  } catch (error) {
    // Capturar erros e enviar resposta apropriada
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
