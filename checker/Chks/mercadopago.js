const express = require('express');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const cors = require('cors');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;


const client = new MercadoPagoConfig({ accessToken: 'TEST-6183492338544877-101219-81b493f2c3531c51e2f6f39adb6ae857-1238413642' });
const payment = new Payment(client);

app.use(express.json());

app.post('/create-payment', async (req, res) => {
    console.log('Requisição recebida:', req.body);
    const { valor } = req.body;

    const body = {
        transaction_amount: valor,
        description: 'Testando API',
        payment_method_id: 'pix',
        payer: {
            email: 'joepkjkasaj@hotmail.com'
        },
    };

    try {
        const response = await payment.create({ body });
        const paymentId = response.id;
        const chavePix = response.point_of_interaction.transaction_data.qr_code;

        const qrCodeImg = await QRCode.toDataURL(chavePix);

        res.json({
            paymentId,
            chavePix,
            qrCodeImg
        });

        
    } catch (error) {
        console.log('Erro ao criar pagamento:', error.response ? error.response.data : error.message);  // Depuração completa
        res.status(500).json({ error: 'Erro ao criar pagamento', details: error.response ? error.response.data : error.message });
    }
});

app.post('/check-payment', async (req, res) => {
    
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
