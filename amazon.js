const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Mobiles';
const prod_data = [];//push csv file data 
const xpath_data = [];
(async() =>{
    try{
        //**********csv file reading section
        fs.createReadStream('ex.csv')
        .pipe(csv({}))
        .on('data', (data) =>prod_data.push(data))
        .on('end', () =>{
            console.log(prod_data);
        });
        //csv file reading section***********
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.amazon.in/', {waitUntil: 'networkidle0', timeout: 0});
        
        var keywords = [];//stored all keywords
        prod_data.forEach(resultss =>{
            for(let key in resultss){
                keyword = `${resultss[key]}`;
                console.log(keyword);
                keywords.push(keyword);
            }
        });
        //inserting keywords in search box
        for(const word of keywords ) {
            let searchInput = await page.$('#twotabsearchtextbox');
            await searchInput.click({clickCount: 3});
            await searchInput.type(word);
            console.log('typpee');
            await page.keyboard.press('Enter'); 
            console.log('Entered');
            //scraping details
            ///collec href links
            all_links = [];
            await page.waitForTimeout(5000);
            await page.waitForXPath('(//a[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"])');
            const link_list = await page.$x('(//a[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"])');
            //await page.waitForNavigation();
            //first page links
            for(const link of link_list){
                const links = await link.evaluate(a =>a.href, link_list[0]);
                console.log({links});
                all_links.push(links);
            }
            await page.waitForTimeout(5000);
            np_links = [];
            await page.waitForXPath('(//a[@class="s-pagination-item s-pagination-button"])');
            const next_page_links = await page.$x('(//a[@class="s-pagination-item s-pagination-button"])');
            for(const nxt_page of next_page_links){
                const next_page = await nxt_page.evaluate(e => e.href, next_page_links[1]);
                np_links.push(next_page);
                console.log(next_page);
                console.log('next button');
            }
            for(const p of np_links){
                await page.goto(p);
                await page.waitForXPath('(//a[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"])');
                const link_listt = await page.$x('(//a[@class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"])');
                for(const linkk of link_listt){
                    const linkss = await linkk.evaluate(a =>a.href, link_listt[0]);
                    console.log({linkss});
                    all_links.push(linkss);
                }
            }
            await page.waitForTimeout(3000);
            console.log('all collected');
            console.log(all_links, '*********************'); 
            //********** reading xpath from csv file***********//
            fs.createReadStream('amz.csv')
            .pipe(csv({}))
            .on('data', (data) =>xpath_data.push(data))
            .on('end', () =>{
                console.log(xpath_data);
            });
            var details = [];//stored scraped data
            //scraping details
            for(const j of all_links){
                const xpaths = []; 
            //     // ************filtering values from xpath**********
                xpath_data.forEach(result =>{
                    for(let key1 in result){
                        xxpath = `${result[key1]}`;
                        console.log(xxpath);
                        //paths = xxpath.toString();
                        xpaths.push(xxpath);
                    }
                });
                await page.goto(j, {waitUntil: 'networkidle0', timeout: 0});
                for(const xpath of xpaths){
                    try{
                        //console.log(xpath); 
                        await page.waitForXPath(xpath, {visible:true, timeout: 2000});
                        const scraped_ele = await page.$x(xpath);
                        const scraped_detail = await page.evaluate(div => div.textContent, scraped_ele[0]);
                        console.log({'Product': word, scraped_detail}); 
                        details.push({'Product': word, scraped_detail});
                    }catch(e){
                        console.log(e);
                    }
                }
                xpaths.length = 0;
            }
            console.log(details);
            all_links.length = 0;
            xpath_data.length = 0;
            MongoClient.connect(url, function(err, db){
                if(err) throw err;
                var dbo = db.db("Mobiles");
                dbo.collection("amazon").insertMany(details, function(err, res){
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