const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()

    await page.setViewport({ width: 800, height: 600 })

    await page.goto('http://unixpapa.com/js/testmouse.html')

    await page.mouse.click(132, 103, { button: 'left' })

    await page.screenshot({ path: 'mouse_click.png' })
    //await browser.close()
})()