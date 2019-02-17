const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.storeDetail = async function(req, res) {
  try {
    const stores = await Store.findOne({ name: req.params.name })
    return res.status(200).json(stores)
  } catch (err) {
    console.error(`An error ocurred while searching for the store ${req.params.name}`, err)
    return res.status(500).json({ error: true })
  }
}
