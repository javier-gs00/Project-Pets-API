const router = require('express').Router();
const WebScraper = require('../../utils/web_scrapers/_web_scrapers_model');

// Execute all the web scrapers of a given category. ie: food
router.get('/category/:category', (req, res) => {
    WebScraper.executeByCategory(req.params.category).then(results => {
        res.status(200).json(results);
    }).catch(err => {
        res.status(500).json(err)
    });
});

// Execute a single scraper from a given category. ie: daymascotas food web scraper
router.get('/one/:category/:name', (req, res) => {
    WebScraper.executeOne(req.params.category, req.params.name)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// Execute all the scrapers
router.get('/all', (req, res) => {
    res.status(200).json({ msg: 'In development...', from: '/all'});
});

module.exports = router;