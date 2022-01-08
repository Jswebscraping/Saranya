const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mylb';
const pro_data = []; 
const xpath_datas = [];
(async() =>{
    try{
        fs.createReadStream('ex.csv')
        .pipe(csv({}))
        .on('data', (data) =>pro_data.push(data))
        .on('end', () =>{
            console.log(pro_data);
        });
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.loblaws.ca/', {waitUntil: 'networkidle0', timeout: 0});
        var keywords = [];
        pro_data.forEach(results =>{
            for(let key in results){
                keyword = `${results[key]}`;
                console.log(keyword);
                keywords.push(keyword);
            }
        });
        for(const word of keywords ){
            var search_bar = await page.waitForXPath('//input[@class="search-input__input"]');
            await search_bar.type(word);
            console.log(word);
            console.log('entered');
            await page.waitForTimeout(3000);
            await page.keyboard.press('Enter'); 
            await search_bar.click({clickCount: 3});
            await search_bar.press('Backspace', {timeout: 5000});            
            console.log('clicked');
            var links = [];
            await page.waitForTimeout(3000);
            await page.waitForXPath('(//a[@class="product-tile__details__info__name__link"])');
            const list = await page.$x('(//a[@class="product-tile__details__info__name__link"])');
            for(const i of list){
                const link = await i.evaluate(a => a.href, list[0]);
                links.push(link);
            }
            console.log(links);
            fs.createReadStream('ex2.csv')
            .pipe(csv({}))
            .on('data', (data) =>xpath_datas.push(data))
            .on('end', () =>{
                console.log(xpath_datas);
            });
            var output = [];    
            for(const j of links){
                const xps = [];  
                 xpath_datas.forEach(result =>{
                    for(let value in result){
                        path = `${result[value]}`;
                        console.log(path);
                        xps.push(path);
                    }
                });
                await page.goto(j, {waitUntil: 'networkidle0', timeout: 0}); 
                for(const xpath of xps){
                    try{ 
                        await page.waitForXPath(xpath, {visible:true, timeout: 2000});
                        const scr_ele = await page.$x(xpath);
                        const scr_detail = await page.evaluate(a => a.textContent, scr_ele[0]);
                        console.log({'Product': word, scr_detail}); 
                        output.push({'Product': word, scr_detail});
                    }catch(e){
                        console.log(e);
                    } 
            }
            xps.length = 0;
        }
        console.log(output);
        links.length = 0;
        xpath_datas.length = 0;
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            var dbo = db.db("mylb");
            dbo.collection("loblaws").insertMany(output, function(err, res){
                if(err) throw err;
                console.log('Number of document inserted', res.insertedcount);
                db.close();
            });
    });
}
}catch(e){
    console.log(e);
}
})();