const cheerio = require("cheerio");
const axios = require("axios");

async function scrape(username) {
    const BASE_URL = "https://a7.ae/snapchat/";
    let { data } = await axios(`${BASE_URL}/index.php?snap=${username}`);
    if ( ! data.includes("نتيجة البحث عن قصة") ) {
        return {
            message: "Error, There is no data",
        }
    }

    let $ = cheerio.load(data);
    let links = $("center .pagination > li > a");
    links = links.slice(1, (links.length - 2));
    let result = [];
    for (let index = 0; index < links.length; index++) {

        const url = links[index].attribs.href;
        if (url) {
            let newData = await get(`${BASE_URL}${url}`);
            for (let index = 0; index < newData.length; index++) {
                const element = newData[index];
                result.push(element)
            }
        }
    }
    return result;
}

async function get(url) {
    let { data } = await axios(url);
    let tr = await cheerio.load(data)("table#AutoNumber1 > tbody > tr").toArray();
    var arr = [];

    tr.map(async (el, index) => {
        var str = await cheerio.load(el).html();
        var returnVal = {
            type: "",
            url: "",
        };
        
        if (str.includes("<video")) {
            returnVal.type = "video";
            returnVal.url = str.split('<source src="')[1].split('"')[0];
        }
        else if (str.includes("<img")) {
            returnVal.type = "image";
            try {
                returnVal.url = str.split('<img src="')[1].split('"')[0];
            } catch (error) {
                
            }
        }
        if (returnVal.url) {
            await arr.push(returnVal);
        }
        
    })

    return arr;
}

module.exports = scrape;