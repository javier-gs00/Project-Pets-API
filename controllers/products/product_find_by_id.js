const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.findById = function(req, res) {
  Product.findById(`${req.params.id}`, (err, data) => {
    if (err) {
      console.log(`=== Error while searching the db:\n ==== ${error}`)
      return res.status(500).json([])
    }

    console.log(`Route response result: ${result}`)
    return res.status(200).json(result)
  })
}
