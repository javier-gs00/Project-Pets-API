const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.findByStoreAndCategory = async function(req, res) {
  try {
    const { category, store } = req.params
    const products = await Product.find({
      store: new RegExp(store, 'i'),
      category: new RegExp(category, 'i')
    })
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json({ err })
  }
}
