const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.deleteByStoreAndCategory = async function(req, res) {
  try {
    const { category, store } = req.params
    const result = await Product.deleteMany({ category, store })
    // result is DeleteWriteOpResultObject which contains the deleted count
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json(err)
  }
}
