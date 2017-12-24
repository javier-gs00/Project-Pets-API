const mongoose = require('mongoose')
const StoreSchema = new mongoose.Schema({
    name: {type: String, require: true},
    url: {type: String, require: true},
    email: [{
        name: {type: String, require: true},
        uri: {type: String, require: true}
    }],
    address: [{
        street: {type: String, require: true},
        commune: {type: String, require: true},
        citytown: {type: String, require: true},
        region: {type: String, require: true},
        Latitude: {type: Number},
        Longitude: {type: Number}
    }],
    phone: [{
        name: {type: String, require: true},
        number: {type: Number, require: true}
    }],
    open_hours: [{
        range: {type: String, require: true},
        open: {type: String, require: true},
        close: {type: String, require: true}
    }],
    veterinary: {type: Boolean, require: true, default: false},
    urgency: {type: Boolean, require: true, default: false},
    physical_store: {type: Boolean, require: true, default: false},
    product_shipping: {type: Boolean, require: true, default: false}
})

const StoreModel = mongoose.model('Store', StoreSchema)

exports.find = () => {
    return new Promise ((resolve, reject) => {
        StoreModel.find((err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}