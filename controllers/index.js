const router = require('express').Router()
const search = require('./search/search');

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.use('/search', search);

module.exports = router;