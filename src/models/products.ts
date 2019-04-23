const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const Promise = require('bluebird')

const Schema = mongoose.Schema
const ProductSchema = new Schema({
  name: String,
  price: Number,
  url: String,
  imageUrl: String,
  category: String,
  animal: { type: String, default: '' },
  store: String,
  date: { type: Date, default: Date.now }
})

// Backup Product Collection to a JSON file in the root directory
ProductSchema.statics.backupCollection = callback => {
  const ProductModel = mongoose.model('Product')
  ProductModel.find().exec((err, products) => {
    const backupJSON = JSON.stringify(products, null, '\t')
    let location = global.__rootDir + '/backupJSON/products.json'
    location = path.normalize(location)

    fs.writeFile(location, backupJSON, err => {
      if (err) console.error('Error saving data to json, err: ', err)
      const msg = 'Product Collection JSON backup created at: ' + location
      callback(err, msg)
    })
  })
}

ProductSchema.statics.saveMany = async data => {
  const products = await checkData(data)
  const date = getDate()
  const total = products.length
  let counter = 0
  await Promise.each(products, async function(product) {
    const newProduct = new ProductModel({ ...product, date })
    await newProduct.save()
    counter = counter + 1
  })
  const response = {
    savedProducts: counter,
    totalProducts: total
  }
  return response
}

// Check that the scraped data contains vaules for name, price and href
function checkData(data) {
  return new Promise(function(resolve, reject) {
    data.forEach(function(product) {
      if (product.name === '' || product.price === '' || product.href === '') {
        const err = 'Incomplete scraped data'
        reject(err)
      }
    })
    resolve(data)
  })
}

function getDate() {
  const date = new Date()
  const today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  return today
}

mongoose.model('Product', ProductSchema)
