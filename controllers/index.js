const router = require('express').Router()
const product = require('./product/product_controller')
const store = require('./store/store_controller')

router.use('/product', product);
router.use('/store', store)

module.exports = router;