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
            return 'food'
        },
        animal: function () {
            return 'cat'
        }
    }
}).delay(1000);

// ========== IMPORTANT =============
// For every new scraper check:
// 1.- URL
// 2.- HTML elements and classes
// 3.- Pages to crawl
// 4.- Console.log messages
//

module.exports = () => {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Pet Happy cat food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'https://www.pethappy.cl/gatos-2/alimentos',
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
        .limit(5) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Pet Happy cat food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Pet Happy cat food web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}