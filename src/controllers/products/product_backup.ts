const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.backup = function(req, res) {
  Product.backupCollection((err, msg) => {
    if (err) return res.status(500).json({ err: 'Backup failed...' })
    return res.status(200).json({ msg: msg })
  })
}
