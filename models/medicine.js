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

function find (query) {
    return new Promise((resolve, reject) => {
        MedModel.find({ name: new RegExp(query, 'i')}, (err, results) => {
            resolve(results);
            reject(err);
        });
    });
};

module.exports = {
    find
};