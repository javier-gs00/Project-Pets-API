// Module that handles the execution of the web scrapers
const path = require('path');
const timer = require('../timer/timer');
let Product = require('../../models/products');
// let daymascotas = require('./medicine/daymascotas');

// Execute one web scraper
exports.executeOne = (category, storeName) => {
    return new Promise ((resolve, reject) => {
        // Create path to web scraper
        let pathToWebScraper = "./"+category+"/"+storeName;
        // pathToWebScraper = path.normalize(pathToWebScraper);
        console.log('=================');
        console.log(pathToWebScraper);

        // Require timer and scraper to execute
        let startTimer = timer();
        // const scraper = require('./medicine/noi');
        const scraper = require(pathToWebScraper);
        scraper()
        .then(data => {
            let endTimer = timer(startTimer);
            console.log("========== " + storeName + " " + category + " scraper ==========");
            console.log("completed in: " + endTimer + " ms");
            return Product.saveMany(data, storeName, category)
        }).then(counter => {
            let result = responseOject(true, counter, storeName, category, null)
            resolve(result);
        }).catch(err => {
            let result = responseOject(false, 0, storeName, category, err)
            reject(result);
        })
    });   
}

// Execute all the web scrapers from a category (folder)

// Execute all the scrapers


// Send JSON with the results
function responseOject (executeCondition, counter, storeName, category, err) {
    let resObj = new Object();
    if (executeCondition === false) {
        // Return if it fails
        resObj.execSuccess = executeCondition;
        resObj.counter = counter;
        resObj.storeName = storeName;
        resObj.category = category;
        resObj.error = err
        // let jsonRes = JSON.stringify(resObj, null, '\t');
        return resObj
    } else {
        // Return if it succeds
        resObj.execSuccess = executeCondition;
        resObj.counter = counter;
        resObj.storeName = storeName;
        resObj.category = category;
        // let jsonRes = JSON.stringify(resObj, null, '\t');
        return resObj
    }
}