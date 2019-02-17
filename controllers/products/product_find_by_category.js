const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.findByCategory = function(req, res) {
  Product.findByCategory(req.params.category, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}
