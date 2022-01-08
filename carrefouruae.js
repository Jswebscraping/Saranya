//reading from csv file
const puppeteer = require('puppeteer');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];//push csv file data into results
const xpath_data = [];//title_xpath
const xpth_data = [];//price_xpath
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvwriter = createCsvWriter({
    path: 'products.csv',
    header: [{id: 't0', title: 'Products'},
            {id: 't1', title: 'Title'},
            {id: 't2', title: 'Price'},]
});
(async() =>{
    try{
        //**********csv file reading section
        fs.createReadStream('ex.csv')
        .pipe(csv({}))
        .on('data', (data) =>results.push(data))
        .on('end', () =>{
        console.log(results);
        });
        //csv file reading section***********
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.carrefouruae.com/', {waitUntil: 'networkidle0', timeout: 0});
        var keywords = [];//stored all keywords
        results.forEach(resultss =>{
            for(let key in resultss){
                keyword = `${resultss[key]}`;
                console.log(keyword);
                keywords.push(keyword);
            }
        });
        //inserting keywords in search box
        for(const word of keywords ){
            //search bar
            let searchInput = await page.$('.css-12uq56f');
            await searchInput.click({clickCount: 3});
            await searchInput.type(word);
            console.log('typpee');
            await page.keyboard.press('Enter'); 
            console.log('Entered');
            ///collec href links
            var all_links = [];//store all links
            await page.waitForTimeout(3000);
            await page.waitForXPath('(//div[@class="css-1nhiovu"]//a)');
            const link_list = await page.$x('(//div[@class="css-1nhiovu"]//a)');
            for(const links of link_list){
                const link = await links.evaluate(a => a.href, link_list[0]);
                //console.log({link});
                all_links.push(link);
            }
            console.log(all_links);
            fs.createReadStream('cf.csv')
            .pipe(csv({}))
            .on('data', (data) =>xpath_data.push(data))
            .on('end', () =>{
                console.log(xpath_data);
            });
            fs.createReadStream('cf2.csv')
            .pipe(csv({}))
            .on('data', (data) =>xpth_data.push(data))
            .on('end', () =>{
                console.log(xpth_data);
            });
            var details = [];//stored scraped data
            //scraping details
            for(const j of all_links){
                const title_xpath = []; 
                const price_xpath = [];
            //     // ************filtering values from xpath**********
                xpath_data.forEach(result =>{
                    for(let key1 in result){
                        xxpath = `${result[key1]}`;
                        console.log(xxpath);
                        //paths = xxpath.toString();
                        title_xpath.push(xxpath);
                    }
                });
                //scraping price_xpath
                xpth_data.forEach(rslt =>{
                    for(let key2 in rslt){
                        xxpth = `${rslt[key2]}`;
                        console.log(xxpth);
                        //paths = xxpath.toString();
                        price_xpath.push(xxpth);
                    }
                });
                await page.goto(j, {waitUntil: 'networkidle0', timeout: 0});
                for(const xpath of title_xpath){
                    try{
                        //console.log(xpath); 
                        //title
                        //await page.waitForXPath('(//h1[@class="yhB1nd"]//span)');
                        await page.waitForXPath(xpath, {visible:true, timeout: 2000});
                        const title_ele = await page.$x(xpath);
                        const titlee = await page.evaluate(span => span.textContent, title_ele[0]);
                        console.log({titlee});
                        for(const xpt of price_xpath){
                            try{
                                //price
                                await page.waitForXPath(xpt, {visible:true, timeout: 2000});
                                const price_ele = await page.$x(xpt);
                                const pricee = await page.evaluate(div => div.textContent, price_ele[0]);
                                console.log({pricee});
                                var final_output = [{t0: word, t1: titlee, t2: pricee}];
                                csvwriter
                                .writeRecords(final_output)
                                .then(() => console.log('successful'));
                                // var final_out = [{t2: pricee}];
                                // csvwriter
                                // .writeRecords(final_out)
                                // .then(() => console.log('success')); 
                            }catch(e){
                                console.log('hid');
                            }
                        }
                         
                    }catch(e){
                        console.log('hidden');
                    }    
                }
                title_xpath.length = 0;
                price_xpath.length = 0;
                
            }
            console.log(details);
            all_links.length = 0;
            xpath_data.length = 0;  
            xpth_data.length = 0;  
           // console.log(details);                          
        }
        await page.waitForTimeout(3000);
        //await search_txt.click({clickCount: 3});
        //await search_txt.press('Backspace', {timeout: 5000});
        await browser.close();        
    }catch(e){
        console.log(e);
    }
})();