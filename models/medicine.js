const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let MedSchema = new Schema ({
    name: String,
    price: Number,
    href: String,
    image_href: String,
    store: String,
    date: { type: Date, default: Date.now}
});

const MedModel = mongoose.model('meds', MedSchema);

exports.find = query => {
    return new Promise((resolve, reject) => {
        MedModel.find({ name: new RegExp(query, 'i')}, (err, results) => {
            resolve(results);
            reject(err);
        });
    });
};

// Save the scraped data of a particular store
exports.save = (data, store) => {
    return new Promise (function (resolve, reject) {
        checkData(data)
        .then(function (data) {
            let counter = 0
            let date = getDate()
    
            data.forEach(function(med) {
                let storeName = (med.store)? med.store : store
                
                //Transform price in string to number
                if (typeof med.price === "string") {
                    med.price = med.price.replace(/\$/g, '')
                    med.price = med.price.replace(/\,/g, '')
                    med.price = med.price.replace(/\./g, '')
                    parseInt(med.price)
                }
    
                let medDocument = new MedModel ({
                    name: med.name,
                    price: med.price,
                    href: med.link,
                    image_href: med.image,
                    store: storeName,
                    date: date
                })
    
                medDocument.save(function (err, medDocument) {
                    if (err) reject(err)
                })
    
                counter += 1
            })
    
            resolve(counter)
        })
        .catch(function (err) {
            reject(err)
        })
    })
}

// Check that the scraped data contains vaules for name, price and href
function checkData (data) {
    return new Promise(function (resolve, reject) {
        let err = null

        data.forEach(function (med) {
            if (med.name === '' || med.price === '' || med.link === '') {
                err = 'Incomplete scraped data'
                reject(err)
            }
        })
        resolve(data)
    })
}

function getDate() {
    let date = new Date()

    // Get the day as a string in format: YYYY/MM/DD
    let today = date.getFullYear() + '/' + (date.getMonth() + 1 ) + '/' + date.getDate()
    return today 
}