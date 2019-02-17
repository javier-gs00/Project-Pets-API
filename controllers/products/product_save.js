const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.save = async function(req, res) {
  try {
    const product = await Product.saveOne()
    return res.status(200).json(product)
  } catch (err) {
    return res.status(500).json({ err })
  }
}
