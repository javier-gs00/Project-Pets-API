const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.deleteById = function(req, res) {
  Product.deleteOne(req.params.id, err => {
    if (err) return res.send(500).json(err)
    return res.status(200).json({ success: true })
  })
}
