const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.findByCategory = async function(req, res) {
  try {
    const products = await Product.find({ category: new RegExp(req.params.category, 'i') })
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json(err)
  }
}
