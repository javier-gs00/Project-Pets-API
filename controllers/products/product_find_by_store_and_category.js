const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.findByStoreAndCategory = function(req, res) {
  Product.findByStoreAndCateogory(req.params.store, req.params.category, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
}
