const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.updateById = function(req, res) {
  Product.updateOne(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}
