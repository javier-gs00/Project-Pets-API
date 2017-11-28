const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let testSchema = new Schema ({
    name: String,
    category: String,
});

const TestModel = mongoose.model('tests', testSchema);

exports.save = (data) => {
    return new Promise ((resolve, reject) => {
        data.forEach(element => {
            let testDoc = new TestModel ({
                name: element.storeName,
                category: element.category
            })
            testDoc.save((err, testDocument) => {
                let customErr = new Error('Test: failed')
                reject(customErr)
            })
            resolve('Test: success')
        });
    })
}