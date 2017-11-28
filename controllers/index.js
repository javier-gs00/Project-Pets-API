const router = require('express').Router()
const search = require('./search/search');
const webSrapers = require('./web_scrapers/web_scrapers');

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.get('/search', search);

router.get('/webscrapers', webSrapers);

module.exports = router;