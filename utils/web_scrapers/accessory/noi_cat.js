const xray = require('x-ray')
const timer = require('../../timer')
const latinUnicodeParser = require('../../latinUnicodeParser')

let x  = xray({
    filters: {
        parseHexUnicode: function (value) {
            return value.indexOf('&#') > 0 ? latinUnicodeParser(value) : value
        },
        priceToInt: function (value) {
            return typeof value == 'string' ? parseInt(value.replace(/[$,.]/g, '')) : value;
        },
        storeName: function () {
            return 'Noi'
        },
        category: function () {
            return 'accessory'
        },
        animal: function () {
            return 'cat'
        }
    }
}).delay(1000);

module.exports = () => {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Noi Mascotas cat accesory web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'https://www.noi.la/mascotte/gato/accesorios-gato/',
            'div.product',
            [{
                name: '.product-title a@html | parseHexUnicode',
                href: 'a@href',
                price: 'span.woocommerce-Price-amount | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        .paginate('.next.page-numbers@href') // Next page button .css classes
        .limit(2) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Noi cat accesory web scraper...');
                reject(err)
            } else {
                let endTimer = timer(startTimer);
                console.log("== Noi Mascotas cat accesory web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}