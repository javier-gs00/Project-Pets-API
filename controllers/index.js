const router = require('express').Router()
const product = require('./product/product_controller')

router.use('/product', product);

module.exports = router;