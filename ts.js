const puppeteer = require('puppeteer');
(async () => {
    try{
        const browser = await puppeteer.launch({headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246');
        await page.goto('https://www.flipkart.com/search?q=shirts&sid=clo%2Cash%2Caxc%2Cmmk%2Ckp7&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_4_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_4_na_na_na&as-pos=1&as-type=RECENT&suggestionId=shirts%7CCasual+Shirts&requestId=ef7c9eeb-4f83-4412-bb97-cafb17969973&as-searchtext=shir', {waitUntil: 'networkidle2', timeout: 0});
        let link_list = [];
        await page.waitForXPath('(//div[@class="_1xHGtK _373qXS"]//a)');
        let link_ele = await page.$x('(//div[@class="_1xHGtK _373qXS"]//a)');
        //method 1 for loop
        for(const i of link_ele){
            let link = await i.evaluate(a => a.href, link_ele[0]);
            link_list.push(link);      
            console.log({link});
        }
        console.log(link_list);
        let details = [];
        for(const j of link_list){
            await page.goto(j, {waitUntil: 'networkidle2', timeout: 0});//go intto the url 
            //get brand name
            await page.waitForXPath('(//div[@class="_30jeq3 _16Jk6d"])');
            let price_ele = await page.$x('(//div[@class="_30jeq3 _16Jk6d"])');
            let price = await page.evaluate(a => a.textContent, price_ele[0]);
            details.push(price);

            await page.waitForXPath('(//span[@class="B_NuCI"])');
            let title_ele = await page.$x('(//span[@class="B_NuCI"])');
            let title = await page.evaluate(a => a.textContent, title_ele[0]);
            details.push(title);

            await page.waitForXPath('(//span[@class="G6XhRU"])');
            let brand_ele = await page.$x('(//span[@class="G6XhRU"])');
            let brand = await page.evaluate(a => a.textContent, brand_ele[0]);
            details.push(brand);
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";

            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var result = {price,title,brand};
            dbo.collection("shirt").insertOne(result, function(err, res) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
            });
            //var result = {price,title,brand};

            //console.log(result);
        }
        console.log(details);
        await browser.close();

    }catch(e) {
        console.log(e);
    }
    
})();