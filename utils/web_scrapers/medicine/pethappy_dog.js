const xray = require('x-ray')
const timer = require('../../timer')
const latinUnicodeParser = require('../../latinUnicodeParser')

let x  = xray({
    filters: {
        parseHexUnicode: function (value) {
            return value.indexOf('&#') > 0 ? latinUnicodeParser(value) : value
        },
        priceToInt: function (value) {
            return typeof value == 'string' ? parseInt(value.replace(/[A-z$,.]/g, '')) : value;
        },
        storeName: function () {
            return 'Pet Happy'
        },
        category: function () {
            return 'medicine'
        },
        animal: function () {
            return 'dog'
        }
    }
}).delay(1000);

module.exports = () => {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Pet Happy dog medicine web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'https://www.pethappy.cl/perros-2/medicamentos-2',
            'div.large-p.columns.producto-box',
            [{
                name: 'h1 a@html | parseHexUnicode',
                href: 'a@href',
                price: '.precio | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        .paginate('li.next a@href') // Next page button .css classes
        .limit(2) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Pet Happy dog medicine web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Pet Happy dog medicine web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}