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
        await driver.get('https://www.drogasil.com.br/');

        let cookiesReject = await driver.wait(until.elementLocated(By.id('onetrust-reject-all-handler')), 10000);
        await cookiesReject.click()


        let loginPage = await driver.wait(until.elementLocated(By.className('user-menu-container user-menu-box')), 10000);
        await loginPage.click()

        
        let loginPage2 = await driver.findElement(By.css('[data-qa="header_menu_btn_login"]'));
        await loginPage2.click()


        // ================== INSERT EMAIL/NUMBER =====================


        let inputEmail = await driver.wait(until.elementLocated(By.id('signInName')), 10000);
        let inputPassw = await driver.wait(until.elementLocated(By.id('password')), 10000)
        let btnLogin = await driver.wait(until.elementLocated(By.id('next')), 10000)

        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");

        await inputEmail.sendKeys(email);
        await inputPassw.sendKeys(senha);

        await btnLogin.click();

        await driver.sleep(3000)

        let textElement = await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        let text = await textElement.getText();

        let url = await driver.getCurrentUrl();

        if(text.includes('E-mail, CPF ou senha inválida.')){
            console.log(picocolors.red(`[ DIE ] » ${email} » [ E-mail, CPF ou senha inválida. ] @yashirocoder`))
        }
        else if(url == 'https://www.drogasil.com.br/customer/account/loginSuccess'){
            console.log(picocolors.red(`[ LIVE ] » ${email} » [ Login valido ] @yashirocoder`))
        }
     
    } catch (error) {
        console.log(picocolors.red(`[ ERROR ] » ${email} » [ Houve um erro ao tentar checar: ${error} ] @yashirocoder`))
    } finally {
        await driver.close()        
    }
})();
