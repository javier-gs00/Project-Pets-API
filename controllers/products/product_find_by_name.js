const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.findByName = async function(req, res) {
  if (!req.query.query) {
    return res.json({
      error: 'Error: No search query received...'
    })
  } else {
    try {
      const products = await Product.find({ name: { $regex: req.query.query, $options: 'i' } })
      return res.status(200).json(products)
    } catch (err) {
      throw new Error(`=== Error while searching the db:\n ==== ${error}`)
    }
  }
}
