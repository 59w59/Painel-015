import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import picocolors from 'picocolors';

(async function loginAutomation() {
    let options = new chrome.Options();
    options.addArguments('--log-level=3');
    options.addArguments('--disable-logging');
    options.addArguments('--disable-gpu');
    options.addArguments('--headless')

    let driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();

    const email = 'yakahot@gmail.com';
    const senha = '@Yashiro191';

    try {
        // ================= MAIN PAGE TO LOGIN =======================

        await driver.get('https://www.lojasrenner.com.br/');

        let bntPageLogin = await driver.wait(until.elementLocated(By.className('user-info')), 10000);
        await bntPageLogin.click();

        // ================== INSERT EMAIL & PASS =====================

        let inputEmail = await driver.wait(until.elementLocated(By.name('login')), 10000);
        let inputPassw = await driver.wait(until.elementLocated(By.name('password')), 10000);
        let loginButton = await driver.wait(until.elementLocated(By.className('Button_button__vcDFE Button_medium__2sh2z')), 10000);

        await inputEmail.sendKeys(email);
        await inputPassw.sendKeys(senha);

        await driver.sleep(2000)

        await loginButton.click();

        await driver.sleep(5000)

        // ================ RETURN ==================

        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        if(text.includes('Esta combinação de usuário e senha é inválida.')){
            console.log('Nao existe')
        }
        else {
            console.log('existe')
        }

    } catch (error) {
        console.log(picocolors.red(`[ ERROR ] » ${email} » [ Houve um erro ao tentar checar: ${error} ] @yashirocoder`))
    } finally {
        await driver.close()
    }
})();
