const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', async (request) => {
        if (request.resourceType() == 'image') {
            await request.abort()
        } else {
            await request.continue()
        }
    })
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.nytimes.com/')
    await page.screenshot({ path: 'nytimes.png', fullPage: true })
    //await browser.close()
})()