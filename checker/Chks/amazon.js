import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import picocolors from 'picocolors';

(async function loginAutomation() {
    let options = new chrome.Options();
    options.addArguments('--log-level=3');
    options.addArguments('--disable-logging');
    options.addArguments('--disable-gpu');

    let driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();

    const email = 'verxcristovao@gmail.com';
    const senha = 'yashiro191';

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

        await driver.sleep(5000)

        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        if(text.includes('Não encontramos uma conta associada a este endereço de e-mail')){
            console.log(picocolors.red(`[ DIE ] » ${email} » [ Não encontramos uma conta associada a este endereço de e-mail  ] @yashirocoder`))
        }
        else {

            await driver.sleep(2000)

            let inputPassw = await driver.wait(until.elementLocated(By.name('password')), 10000);
            let loginButton = await driver.wait(until.elementLocated(By.id('auth-signin-button')), 10000)

            await inputPassw.sendKeys(senha)
            await loginButton.click()

            await driver.sleep(2000)

            let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
            let text = await textElement.getText();

            if(text.includes('Sua senha está incorreta')){
                console.log(picocolors.red(`[ DIE ] » ${email} » [ Login invalido ] @yashirocoder`))
            }
            else {
                console.log(picocolors.green(`[ LIVE ] » ${email} » [ Login valido ] @yashirocoder`))
            }
        }

    } catch (error) {
        console.log(picocolors.red(`[ ERROR ] » ${email} » [ Houve um erro ao tentar checar: ${error} ] @yashirocoder`))
    } finally {
        await driver.quit();
    }
})();
