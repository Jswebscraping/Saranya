const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto('https://www.google.com/')
    const title = await page.title()
    console.log(title)
    //await browser.close()
})();