const router = require('express').Router()
const product = require('../controllers/product/product_controller')
const store = require('../controllers/store/store_controller')

router.use('/product', product)
router.use('/store', store)

module.exports = router
