const router = require('express').Router()
const product = require('./product/product_controller')
const webScrapers = require('./web_scrapers/web_scrapers_controller')

router.use('/product', product);

router.use('/webscrapers', webScrapers)

module.exports = router;