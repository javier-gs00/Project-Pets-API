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
            return 'Punto Mascotas'
        },
        category: function () {
            return 'accessory'
        },
        animal: function () {
            return ''
        }
    }
}).delay(1000);

module.exports = () => {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Punto Mascotas accessory web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.puntomascotas.cl/category.php?id_category=14',
            'li.ajax_block_product',
            [{
                name: 'h3 a@title | parseHexUnicode',
                href: 'h3 a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        .paginate('li#pagination_next a@href') // Next page button .css classes
        .limit(59) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Punto Mascotas accessory web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Punto Mascotas accessory web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}