const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main (){
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246');
        await page.goto('https://grofers.com/prn/eno-lemon-digestive-antacid/prid/10841', {waitUntil: 'networkidle2', timeout: 0});
        await page.waitForSelector('.css-1dbjc4n');
        const lis = await page.$$('.css-1dbjc4n');
        for(const i of lis){
            var discount = await i.$eval('.r-1awozwy', div => div.innerText);
            var prod_name = await i.$eval('.css-cens5h', div => div.innerText);
            var rating = await i.$eval('.r-1f6r7vd', div => div.innerText);
           // var prod_MRP = await i.$eval('.css-1dbjc4n r-1awozwy r-18u37iz r-5oul0u', div => div.innerText);
            var sell_price = await i.$eval('.r-13wfysu', div => div.innerText);
           // var Inc_taxes = await i.$eval('.r-14gqq1x', div => div.innerText);
        // var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://localhost:27017/";

        // MongoClient.connect(url, function(err, db) {
        // if (err) throw err;
        // var dbo = db.db("mydb");
        // var result = {discount,prod_name,rating,sell_price/*,Inc_taxes*/};
        // dbo.collection("eno").insertOne(result, function(err, res) {
        //     if (err) throw err;
        //     console.log(result);
        //     db.close();
        // });
        // });

            var result = {discount,prod_name,rating,sell_price/*,Inc_taxes*/};
            console.log(result);

            fs.appendFile('output1.json', JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                }
            })
        }
        console.log('Its showing');
            await browser.close();

    }catch(e){
        console.log('error',e);
    }
})();