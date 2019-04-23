const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.storeList = async function(req, res) {
  try {
    const stores = await Store.find()
    return res.status(200).json(stores)
  } catch (err) {
    console.error('An error ocurred while getting the stores list', err)
    return res.status(500).json([])
  }
}
