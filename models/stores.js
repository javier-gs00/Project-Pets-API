const mongoose = require('mongoose')
const StoreSchema = new mongoose.Schema({
    name: {type: String, require: true},
    uri: {type: String, require: true},
    email: [{
        name: {type: String, require: true},
        uri: {type: String, require: true}
    }],
    address: [{
        street: {type: String, require: true},
        commune: {type: String, require: true},
        cityTown: {type: String, require: true},
        region: {type: String, require: true},
        latitude: {type: Number},
        longitude: {type: Number}
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
    grooming: {type: Boolean, require: true, default: false},
    veterinary: {type: Boolean, require: true, default: false},
    urgency: {type: Boolean, require: true, default: false},
    physical_store: {type: Boolean, require: true, default: false},
    product_shipping: {type: Boolean, require: true, default: false}
})

const StoreModel = mongoose.model('Store', StoreSchema)

async function find() {
    try {
        const results = await StoreModel.find()
        if (!results.length) return ({error: "Stores not found"})
        return results
    } catch(err) {
        return ({error: "Error while getting the stores"})
    }
}

async function findOne(name) {
    try {
        let store = await StoreModel.find({name: name})
        if (!store.length) return ({error: "Store not found"})
        return store[0]
    } catch(err) {
        return ({error: "Error while performing a store search"})
    }
}

module.exports = {
    find,
    findOne
}