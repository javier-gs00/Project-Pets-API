const router = require('express').Router()
const product = require('./products/products')
const store = require('./stores/stores')

router.use('/product', product)
router.use('/store', store)

module.exports = router
