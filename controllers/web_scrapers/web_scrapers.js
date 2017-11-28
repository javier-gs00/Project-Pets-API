const fs = require('fs')
const path = require('path')

// Import utilities
const timer = require('../../utils/timer');

// Import DB Models
const Meds = require('../../models/medicine');
const Tests = require('../../models/test');

module.exports = (req, res) => {
    let storeName = req.query.storeName
    let category = req.query.category

    // Create path to web scraper
    let pathToWebScraper = __rootDir+"/utils/web_scrapers/"+req.query.category +"/"+req.query.storeName;
    pathToWebScraper = path.normalize(pathToWebScraper);
    console.log('=================');
    console.log(pathToWebScraper);

    // Require scraper to execute
    let startTimer = timer();
    const scraper = require(pathToWebScraper)
    scraper()
    .then(data => {
        let endTimer = timer(startTimer);
        console.log("==========" + storeName + " " + category + " scraper ==========");
        console.log("completed in: " + endTimer + " ms");
        return Meds.save(data, storeName)
    }).then(counter => {
        let resObj = new Object();
        resObj.execSuccess = true;
        resObj.counter = counter;
        resObj.storeName = storeName;
        resObj.category = category;
        let jsonRes = JSON.stringify(resObj, null, '\t');
        return res.json(resObj);
    }).catch(err => {
        let resObj = new Object();
        resObj.execSuccess = false;
        resObj.counter = 0;
        resObj.storeName = storeName;
        resObj.category = category;
        let jsonRes = JSON.stringify(resObj, null, '\t');
        return res.json(jsonRes);
    })
}

// Render the view and send the corresponding messages depending on the action executed
// function renderMeds (err, type, counter) {
//     if (err) {
//         console.log(err)
//         return res.render('scrapers', {
//             error: true
//         })
//     } else if (type === 'execute') {
//         console.log(counter + ' documents saved to the Meds collection')
//         return res.render('scrapers', {
//             executeMeds: true,
//             counter: counter
//         })
//     } else if (type === 'delete') {
//         console.log(counter + ' documents deleted from the Meds collection')
//         return res.render('scrapers', {
//             deleteMeds: true,
//             counter: counter
//         })
//     }
// }

function testRoute (res) {
    let response = new Object()
    response.storeName = storeName
    response.category = category
    let testArray = []
    testArray.push(response)
    Tests.save(testArray)
    .then(result => {
        console.log(result)
        return res.json(result, null, '\t')
    })
    .catch(err => {
        console.log(err)
        return res.json(err, null, '\t')
    })
}