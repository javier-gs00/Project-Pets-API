// Module that handles the execution of the web scrapers
const path = require('path');
const fs = require('fs');
const async = require('async');
const timer = require('../timer/timer');
let Product = require('../../models/products');
// let daymascotas = require('./medicine/daymascotas');

// Active web scrapers in the medicine folder should be added here to be used
let medScrapersArray = [
    {fileName: 'daymascotas', storeName: 'Day Mascotas'},
    {fileName: 'noi', storeName: 'Noi'}
]
// let medScrapersMap = new Map(medScrapersArray);

// Execute one web scraper
exports.executeOne = (category, storeName) => {
    return new Promise ((resolve, reject) => {
        // Create path to web scraper
        let pathToWebScraper = "./"+category+"/"+storeName;
        // pathToWebScraper = path.normalize(pathToWebScraper);
        console.log("========== " + storeName + " " + category + " scraper started ==========");
        // Require timer and scraper to execute
        // let startTimer = timer();
        // const scraper = require('./medicine/noi');
        const scraper = require(pathToWebScraper);
        scraper().then(data => {
            // let endTimer = timer(startTimer);
            console.log("========== " + storeName + " " + category + " scraper finished ==========");
            // console.log("completed in: " + endTimer + " ms");
            return Product.saveMany(data)
        }).then(counter => {
            let result = responseOject(true, counter, storeName, category, null)
            resolve(result);
        }).catch(err => {
            let result = responseOject(false, 0, storeName, category, err)
            reject(result);
        })
    });   
};

// Execute all the web scrapers from a category (folder)
exports.executeByCategory = (category) => {
    return new Promise ((resolve, reject) => {
        if (category == 'food') {
            resolve({ msg: 'Working on it...' });
        } else if (category == 'medicine') {
            
            async.mapSeries(medScrapersArray, (scraper, callback) => {
                let pathToWebScraper = './'+category+'/'+scraper.fileName;
                console.log("========== " + scraper.storeName + " " + category + " scraper started ==========");
                const webScraper = require(pathToWebScraper);
                // let startTimer = timer(); // timer breaks the execution of multiple scrapers, need fixing
                webScraper().then(data => {
                    // let endTimer = timer(startTimer);
                    console.log("========== " + scraper.storeName + " " + category + " scraper finished ==========");
                    // console.log("completed in: " + endTimer + " ms");
                    return Product.saveMany(data)
                }).then(counter => {
                    console.log('Products scraped from ' + scraper.storeName + ' are ' + counter);
                    callback(null, { store: scraper.storeName, products: counter })
                }).catch(err => {
                    callback(err)
                });
            }, (err, results) => {
                console.log(results)
                resolve(results);
                reject(err);
            });
        } else if (category == 'accesory') {
            resolve({ msg: 'Working on it...' });
        } else {
            resolve({ msg: 'Working on it...' });
        };
    });
};

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

// executes all async IN TESTINT!!
// function executeManyAsync (webScrapersArray, callback) {
//     let promiseArray = medScrapersArray.map(scraper => {
//         let pathToWebScraper = './'+category+'/'+scraper.fileName;
//         console.log('=================');
//         console.log(pathToWebScraper);
//         const webScraper = require(pathToWebScraper)
//         // Require timer and scraper to execute
//         let startTimer = timer();
//         webScraper().then(data => {
//             let endTimer = timer(startTimer);
//             console.log("========== " + storeName + " " + category + " scraper ==========");
//             console.log("completed in: " + endTimer + " ms");
//             return Product.saveMany(data)
//         }).then(counter => {
//             console.log('Products scraped from ' + scraper.storeName + ' are ' + counter);
//             return { store: storeName, products: counter };
//         }).catch(err => {
//             reject(err)
//         })
//     });

//     let results = Promise.all(promiseArray);
//     results.then(data => {
//         callback(null, data)
//     }).catch(err => {
//         callback(err)
//     })
// };

function executeManySync (webScrapersArray, category) {
    return new Promise ((resolve, reject) => {
        // track the total number of documents saved to the collection and a detailed look by store in an array
        // let documentCounter = 0;

        async.mapSeries(webScrapersArray, (scraper, callback) => {
            console.log('check 2');
            let pathToWebScraper = './'+category+'/'+scraper.fileName;
            console.log('=================' + pathToWebScraper);
            let startTimer = timer();
            let webScraper = require(pathToWebScraper)
            webScraper().then(data => {
                let endTimer = timer(startTimer);
                console.log("========== " + storeName + " " + category + " scraper ==========");
                console.log("completed in: " + endTimer + " ms");
                return Product.saveMany(data)
            }).then(counter => {
                console.log('Products scraped from ' + scraper.storeName + ' are ' + counter);
                // documentCounter += counter;
                callback(null, { store: scraper.storeName, products: counter })
            }).catch(err => {
                callback(err)
            });
        }, (err, results) => {
            console.log(results)
            resolve(results);
            reject(err);
        });
    });
}
