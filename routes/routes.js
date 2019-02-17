const router = require('express').Router()
const product = require('../controllers/product/product_controller')
const store = require('./stores/stores')

router.use('/product', product)
router.use('/store', store)

module.exports = router
