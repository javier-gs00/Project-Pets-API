const xray = require('x-ray')
const timer = require('../../timer')

let x  = xray({
    filters: {
        rmVisitanos: function (value) {
            return value === 'VISITANOS' ? value = '' : value
        },
        rmLlamanos: function (value) {
            return value === 'LLÁMANOS' ? value = '' : value
        },
        rmEscribenos: function (value) {
            return value === 'ESCRÍBENOS' ? value = '' : value
        },
        rmHorarios: function (value) {
            return value === 'HORARIOS' ? value = '' : value
        },
        priceToInt: function (value) {
            return typeof value == 'string' ? parseInt(value.replace(/[$,.]/g, '')) : value
        },
        storeName: function () {
            return 'Day Mascotas'
        },
        category: function () {
            return 'food'
        },
        animal: function () {
            return 'cat'
        }
    }
}).delay(1000)

module.exports = () => {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Day Mascotas cat food Web Scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://daymascotas.cl/categoria-producto/alimentos-gato/',
            '.show-links-onimage',
            [{
                name: 'h2 | rmVisitanos | rmLlamanos | rmEscribenos | rmHorarios',
                href: 'a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        .paginate('.next.page-numbers@href') // Next page button .css classes
        .limit(4) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Day Mascotas medicine web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer);
                console.log("  == Completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}