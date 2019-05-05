import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
import Promise from 'bluebird'

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
export const backupCollection = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const ProductModel = mongoose.model('Product')
    ProductModel.find().exec((err, products) => {
      const backupJSON = JSON.stringify(products, null, '\t')
      let location = path.resolve('backupJSON','products.json')
      location = path.normalize(location)
  
      fs.writeFile(location, backupJSON, err => {
        if (err) {
          console.error('Error saving data to json, err: ', err)
          reject(err)
        }
        const msg = 'Product Collection JSON backup created at: ' + location
        resolve(msg)
      })
    })
  })
}

export const saveMany = async (data: any) => {
  const ProductModel = mongoose.model('Product')
  const products: any[] = await checkData(data)
  const date: string = getDate()
  const total: number = products.length
  let counter: number = 0
  try {
    await Promise.each(products, async (product: any) => {
      const newProduct = new ProductModel({ ...product, date })
      await newProduct.save()
      counter = counter + 1
    })
    const response: object = {
      savedProducts: counter,
      totalProducts: total
    }
    return response
  } catch(err) {
    throw new Error(err)
  }
}

// Check that the scraped data contains vaules for name, price and href
function checkData(data: any[]): Promise<any[]> {
  return new Promise<any[]>(function(resolve, reject) {
    data.forEach(function(product) {
      if (product.name === '' || product.price === '' || product.href === '') {
        const err = 'Incomplete scraped data'
        reject(err)
      }
    })
    resolve(data)
  })
}

function getDate(): string {
  const date = new Date()
  const today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
  return today
}

export default mongoose.model('Product', ProductSchema)
