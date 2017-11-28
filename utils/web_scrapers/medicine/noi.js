const xray = require('x-ray');

let x  = xray().delay(1000);

exports.webScraper = () => {
    return new Promise ((resolve, reject) => {
        // Init scraper
        x(
            'https://www.noi.la/mascotte/perros/farmacia-perros/',
            'div.product',
            [{
                name: '.product-title a@html',
                link: 'a@href',
                price: 'span.woocommerce-Price-amount',
                image: 'img@src'
            }]
        )
        .paginate('.next.page-numbers@href') // Next page button .css classes
        .limit(3) // Pages to crawl limit
        ((err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}