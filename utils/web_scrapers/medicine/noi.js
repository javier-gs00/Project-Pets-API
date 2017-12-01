const xray = require('x-ray');

let x  = xray({
    filters: {
        priceToInt: function (value) {
            return typeof value == 'string' ? parseInt(value.replace(/[$,.]/g, '')) : value;
        },
        storeName: function () {
            return 'Noi'
        },
        category: function () {
            return 'medicine'
        }
    }
}).delay(1000);

module.exports = () => {
    return new Promise ((resolve, reject) => {
        // Init scraper
        x(
            'https://www.noi.la/mascotte/perros/farmacia-perros/',
            'div.product',
            [{
                name: '.product-title a@html',
                href: 'a@href',
                price: 'span.woocommerce-Price-amount | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category'
            }]
        )
        .paginate('.next.page-numbers@href') // Next page button .css classes
        .limit(3) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Noi medicine web scraper...');
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}