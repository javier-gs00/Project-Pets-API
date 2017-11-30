// Module that executes all the scrapers

const Meds = require('../../models/medicine');
// Medicine scrapers
const daymascotas = require('./medicine/daymascotas');
const noi = require('./medicine/noi');
// const test1 = require('./medicine/test');
// const test2 = require('./medicine/test2');

exports._executeAll = () => {
    return new Promise ((resolve, reject) => {
        // Create a resolved Promises Array
        let executedWebScrapers = [
            daymascotas(),
            noi()
        ]
        Promise.all(executedWebScrapers)
        .then(dataArray => {
            // Data Array contains all the data objects from the web scrapers
            let scrapedDocumentsCounter = 0
            dataArray.forEach(data => {
                Meds.save(data, storeName)
            });
        })
        .catch(err => {
            let testErrObj = new Object();
            let execAllErr = new Error('ExecuteAll web scrapers failed: details => ' + err);
            testErrObj.error = execAllErr
            console.log('_all catch error')
            let testErrJson = JSON.stringify(testObj, null, '\t')
            reject(testErrJson);
        })
    });
};

// TEST CODE
// return new Promise ((resolve, reject) => {
//     // Create a resolved Promises Array
//     let executedWebScrapers = [
//         test1(),
//         test2()
//     ]
//     Promise.all(executedWebScrapers)
//     .then(counterArray => {
//         // counterArray is a collection of the all the counters returned by the scrapers
//         let totalCounter = 0
//         for (let i = 0; i < counterArray.length; i++) {
//             totalCounter += counterArray[i]
//         }
//         let testObj = new Object();
//         testObj.counter = totalCounter
//         let testJson = JSON.stringify(testObj, null, '\t')
//         console.log('=== testJSON')
//         console.log(testJson)
//         resolve(testJson)
//     })
//     .catch(err => {
//         let testErrObj = new Object();
//         let execAllErr = new Error('ExecuteAll web scrapers failed: details => ' + err);
//         testErrObj.error = execAllErr
//         console.log('_all catch error')
//         let testErrJson = JSON.stringify(testObj, null, '\t')
//         reject(testErrJson);
//     })
// });
