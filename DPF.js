const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main() {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246');
        await page.goto('https://www.loblaws.ca/search?search-bar=Dry%20Puppy%20Food', {waitUntil: 'networkidle2', timeout: 0 });
        await page.waitForSelector('.product-tile__details__info');
        const lis = await page.$$('.product-tile__details__info');
        for(const i of lis){
            var prod_name = await i.$eval('div>h3>a>span', span => span.innerText);
            var sell_price = await i.$eval('div>div>div>span', span => span.innerText);
            var com_price = await i.$eval('div>ul>li>span', span => span.innerText);

            var result = {prod_name,sell_price,com_price};
            console.log(result);

            fs.appendFile('output2.json', JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                }
            })
        }
        console.log('Its showing');
            await browser.close();
    }catch(e) {
        console.log('error', e);
    }
})();