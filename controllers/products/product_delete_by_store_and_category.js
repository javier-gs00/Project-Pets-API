const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.deleteByStoreAndCategory = async function(req, res) {
  try {
    const result = await Product.deleteMany(req.params.store, req.params.category)
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json(err)
  }
}
