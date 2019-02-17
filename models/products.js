const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
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
    let backupJSON = JSON.stringify(products, null, '\t')
    let location = global.__rootDir + '/backupJSON/products.json'
    location = path.normalize(location)

    fs.writeFile(location, backupJSON, err => {
      if (err) console.error('Error saving data to json, err: ', err)
      let msg = 'Product Collection JSON backup created at: ' + location
      callback(err, msg)
    })
  })
}

// Delete all products from a store specified category
// Categories are food, medicine or accessories
ProductSchema.statics.deleteMany = (storeName, categoryName) => {
  const ProductModel = mongoose.model('Product')
  return new Promise((resolve, reject) => {
    console.log('check function')
    if (categoryName.match(/^(food|medicine|accesory)$/)) {
      ProductModel.deleteMany({ category: categoryName, store: storeName }, (err, result) => {
        // result is DeleteWriteOpResultObject which contains the deleted count
        resolve(result)
        reject(err)
      })
    } else {
      let err = new Error("Err: Product.deleteMany.categoryName doesn't match...")
      reject(err)
    }
  })
}

// Find a product by Id
ProductSchema.statics.findByProductId = id => {
  const ProductModel = mongoose.model('Product')
  console.log(process.env.NODE_ENV)
  return new Promise((resolve, reject) => {
    ProductModel.find({ _id: id }, (err, product) => {
      if (err) reject(err)
      resolve(product)
    })
  })
}

// Find a product by name using a RegExp
ProductSchema.statics.findByName = query => {
  const ProductModel = mongoose.model('Product')
  return new Promise((resolve, reject) => {
    ProductModel.find({ name: { $regex: query, $options: 'i' } }, (err, products) => {
      resolve(products)
      reject(err)
    })
  })
}

// Get all the products from a given category and store
ProductSchema.statics.findByStoreAndCategory = (storeName, category, callback) => {
  const ProductModel = mongoose.model('Product')
  ProductModel.find(
    { store: new RegExp(storeName, 'i'), category: new RegExp(category, 'i') },
    (err, products) => {
      callback(err, products)
    }
  )
}

ProductSchema.statics.findByCategory = (category, callback) => {
  const ProductModel = mongoose.model('Product')
  ProductModel.find({ category: new RegExp(category, 'i') }, (err, products) => {
    callback(err, products)
  })
}

ProductSchema.statics.saveOne = () => {
  return new Promise((resolve, reject) => {
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

ProductSchema.statics.saveMany = data => {
  return new Promise(function(resolve, reject) {
    checkData(data)
      .then(function(data) {
        let counter = 0
        let date = getDate()
        data.forEach(function(product) {
          let newProduct = new ProductModel({
            name: product.name,
            price: product.price,
            href: product.href,
            image_href: product.imageHref,
            category: product.category,
            animal: product.animal,
            store: product.store,
            date: date
          })
          newProduct.save(function(err, newDocument) {
            if (err) reject(err)
          })
          counter += 1
        })
        resolve(counter)
      })
      .catch(function(err) {
        let error = new Error('Save Many Product Model error...')
        reject(error)
      })
  })
}

// Update one product by Id
ProductSchema.statics.updateOne = (id, data, callback) => {
  const ProductModel = mongoose.model('Product')
  ProductModel.findByIdAndUpdate(id, data, { new: true }, (err, result) => {
    callback(err, result)
  })
}

// Check that the scraped data contains vaules for name, price and href
function checkData(data) {
  return new Promise(function(resolve, reject) {
    let err = null

    data.forEach(function(product) {
      if (product.name === '' || product.price === '' || product.href === '') {
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
  let today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  return today
}

mongoose.model('Product', ProductSchema)
