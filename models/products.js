const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    url: String,
    imageUrl: String,
    category: String,
    animal: { type: String, default: '' },
    store: String,
    date: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', ProductSchema);

// Backup Product Collection to a JSON file in the root directory
exports.backupCollection = (callback) => {
    ProductModel.find().exec((err, products) => {
        let backupJSON = JSON.stringify(products, null, '\t');
        let location = global.__rootDir + '/backupJSON/products.json';
        location = path.normalize(location);
        fs.writeFile(location, backupJSON, (err) => {
            if (err) console.error('Error saving data to json, err: ', err)
            let msg = 'Product Collection JSON backup created at: ' + location;
            callback(err, msg);
        })
    });
};

// Compare scraped data with the data in the database and update accordingly
// exports.compareProducts = (scrapedData) => {
//     return new Promise ((resolve, reject) => {
//         scrapedData.forEach(product => {
//             ProductModel.find({})
//         })
//     });
// };

// Delete one Product by ID
exports.deleteOne = (id, callback) => {
    ProductModel.findOneAndRemove({ _id: id }, (err, result) => {
        callback(err, result)
    });
};

// Delete all products from a store specified category
// Categories are food, medicine or accesories
exports.deleteMany = (storeName, categoryName) => {
    return new Promise ((resolve, reject) => {
        console.log('check function');
        if (categoryName.match(/^(food|medicine|accesory)$/)) {
            ProductModel.deleteMany({ category: categoryName, store: storeName }, (err, result) => {
                // result is DeleteWriteOpResultObject wich contains the deleted count
                resolve(result);
                reject(err);
            });
        } else {
            let err = new Error("Err: Product.deleteMany.categoryName doesn't match..." );
            reject(err) 
        }
    });
};

// Find a product by Id
exports.findById = id => {
    return new Promise((resolve, reject) => {
        ProductModel.findById(id, (err, product) => {
            resolve(product);
            reject(err);
        })
    })
}

// Find a product by name using a RegExp
exports.findByName = query => {
    return new Promise((resolve, reject) => {
        ProductModel.find({ name: { $regex: query, $options: "i"} }, (err, products) => {
            resolve(products)
            reject(err)
        })
        // ProductModel.find({ name: new RegExp(query, 'i') }, (err, products) => {
        //     resolve(products);
        //     reject(err);
        // });
    })
}

// Get all the products from a given category and store
exports.findByStoreAndCateogory = (storeName, category, callback) => {
    ProductModel.find({ store: new RegExp(storeName, 'i'), category: new RegExp(category, 'i') }, (err, products) => {
        callback(err, products);
    })
}

exports.findByCategory = (category, callback) => {
    ProductModel.find({ category: new RegExp(category, 'i')}, (err, products) => {
        callback(err, products)
    })
}

exports.saveOne = () => {
    return new Promise ((resolve, reject) => {
        console.log('check 1')
        let newProduct = new ProductModel({
            name: 'Test',
            price: 123,
            href: 'href',
            image_href: 'Image href',
            category: 'test category',
            animal: 'test animal',
            store: 'test store'
        })
        console.log('check 2')
        newProduct.save((err, newDocument) => {
            if (err) {
                console.log('check 3')
                let error = new Error('Saving doc error')
                jsonRes = JSON.stringify(error, null, '\t')
                reject(jsonRes)
            } else {
                console.log('check 4')
                resolve(newDocument)
            }
        })
    })
}

exports.saveMany = (data) => {
    return new Promise (function (resolve, reject) {
        checkData(data)
        .then(function (data) {
            let counter = 0;
            let date = getDate();    
            data.forEach(function(product) {   
                let newProduct = new ProductModel ({
                    name: product.name,
                    price: product.price,
                    href: product.href,
                    image_href: product.imageHref,
                    category: product.category,
                    animal: product.animal,
                    store: product.store,
                    date: date
                })    
                newProduct.save(function (err, newDocument) {
                    if (err) reject(err);
                })    
                counter += 1;
            })    
            resolve(counter);
        })
        .catch(function (err) {
            let error = new Error('Save Many Product Model error...');
            reject(error);
        });
    });
};

// Update one product by Id
exports.updateOne = (id, data, callback) => {
    ProductModel.findByIdAndUpdate(id, data, {new: true}, (err, result) => {
        callback(err, result);
    });
};

// Check that the scraped data contains vaules for name, price and href
function checkData (data) {
    return new Promise(function (resolve, reject) {
        let err = null;

        data.forEach(function (product) {
            if (product.name === '' || product.price === '' || product.href === '') {
                err = 'Incomplete scraped data';
                reject(err);
            }
        })
        resolve(data);
    })
}

function getDate() {
    let date = new Date();

    // Get the day as a string in format: YYYY/MM/DD
    let today = date.getFullYear() + '/' + (date.getMonth() + 1 ) + '/' + date.getDate();
    return today;
}

