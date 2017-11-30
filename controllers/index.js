const router = require('express').Router()
const search = require('./search/search');

const product = require('./product/product_controller')
const webScrapers = require('./web_scrapers/web_scrapers_controller')

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.get('/search', search);

router.use('/product', product);

router.use('/webscrapers', webScrapers)

module.exports = router;