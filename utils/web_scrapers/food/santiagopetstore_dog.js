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
            return 'Santiago Pet Store'
        },
        category: function () {
            return 'food'
        },
        animal: function () {
            return 'dog'
        }
    }
}).delay(1000);

module.exports = () => {
    return new Promise ((resolve, reject) => {
        // create a new array that will hold the scraped objects
        let dataArray = []

        let resolvedPromisesArray = [
            latasLight(),
            latasCachorros(),
            latasAdultos(),
            latasSenior(),
            starterRoyalCanin(),
            alimentosCachorro(),
            alimentosAdulto(),
            prescripcionVeterinaria(),
            alimentosSenior(),
            alimentosNaturales(),
            alimentosBajasCalorias(),
            alimentosBajasPielSensiblePage1(),
            alimentosBajasPielSensiblePage2()
        ]

        Promise.all(resolvedPromisesArray).then(categoryArray => {
            // Both crawlers return an array of objects
            // so we have to iterate on each array to push
            categoryArray.forEach(category => {
                category.forEach(product => {
                    dataArray.push(product)
                })
            })
            resolve(dataArray)
        }).catch(error => {
            reject(error)
        })
        // alimentosBajasCalorias().then(data => {
        //     resolve(data)
        // }).catch(error => {
        //     reject(error)
        // })
    })
}

// ALimentos humedos enlatados para perros
// Latas light Returns an array of objects
function latasLight () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Santiago Pet Store "latas light" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_188_228',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(1) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Santiago Pet Store "latas light" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Santiago Pet Store 'latas light' dog food web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}
// Latas cachorros
function latasCachorros () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "latas cachorros" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_188_189',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Tienda Pet "latas cachorros" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Tienda Pet 'latas cachorros' dog food web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}
// Latas adultos
function latasAdultos () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "latas adultos" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_188_191',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Tienda Pet "latas adultos" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Tienda Pet 'latas adultos' dog food web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}
// Latas senior
function latasSenior () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "latas senior" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_188_192',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Tienda Pet "latas senior" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Tienda Pet 'latas senior' dog food web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}

// Alimentos starter de Royal Canin
function starterRoyalCanin () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet dog "starter Royal Canin" food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_175',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Tienda Pet dog "starter Royal Canin" food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Tienda Pet dog 'starter Royal Canin' food web scraper completed in: " + endTimer + " ms ==")
                resolve(data)
            }
        })
    })
}

// Alimentos perro cachorro
function alimentosCachorro () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet dog "alimentos cachorro" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_43',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos cachorro" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet dog "alimentos cachorro" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}

// Alimentos perro adulto
function alimentosAdulto () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "alimentos adulto" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_44',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos adulto" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "alimentos adulto" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}

// Prescripción veterinaria
function prescripcionVeterinaria () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "prescripcion veterinaria" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_47',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "prescripcion veterinaria" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "prescripcion veterinaria" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}

// Alimentos senior
function alimentosSenior () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "alimentos senior" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_46',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos senior" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "alimentos senior" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}

// Alimentos naturales
function alimentosNaturales () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "alimentos naturales" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_121',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos naturales" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "alimentos naturales" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}

// Alimentos bajas calorias
function alimentosBajasCalorias () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "alimentos bajas calorias" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_45',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(9) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos bajas calorias" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "alimentos bajas calorias" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}

// Alimentos piel sensible y alergias alimentarias
function alimentosBajasPielSensiblePage1 () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "alimentos piel sensible 1" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_165',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(2) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos piel sensible 1" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "alimentos piel sensible 1" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}
function alimentosBajasPielSensiblePage2 () {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet "alimentos piel sensible 2" dog food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'http://www.santiagopetstore.cl/tienda/index.php?route=product/category&path=20_26_165&page=2',
            'div.product-layout',
            [{
                name: 'h4 a@html | parseHexUnicode',
                href: 'div.image a@href',
                price: '.price | priceToInt',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        //.paginate('a.fa-chevron-right@href') // Next page button .css classes
        //.limit(2) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error from Tienda Pet "alimentos piel sensible 2" dog food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log('== Tienda Pet "alimentos piel sensible 2" dog food web scraper completed in: ' + endTimer + ' ms ==')
                resolve(data)
            }
        })
    })
}