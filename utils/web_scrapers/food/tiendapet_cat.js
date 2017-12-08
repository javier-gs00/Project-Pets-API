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
            return 'Tienda Pet'
        },
        category: function () {
            return 'food'
        },
        animal: function () {
            return 'cat'
        }
    }
}).delay(1000);

module.exports = () => {
    return new Promise ((resolve, reject) => {
        console.log('==== Starting Tienda Pet cat food web scraper ====')
        let startTimer = timer();
        // Init scraper
        x(
            'https://www.tiendapet.cl/catalogo/gato/alimentos/',
            'div.block-producto',
            [{
                name: 'h5 | parseHexUnicode',
                href: 'a.catalogo_click_detail@href',
                price: 'table@html',
                imageHref: 'img@src',
                store: 'h1 | storeName',
                category: 'h1 | category',
                animal: 'h1 | animal'
            }]
        )
        .paginate('a.fa-chevron-right@href') // Next page button .css classes
        .limit(19) // Pages to crawl limit
        ((err, data) => {
            if (err) {
                console.log('Error fron Tienda Pet cat food web scraper...')
                reject(err)
            } else {
                let endTimer = timer(startTimer)
                console.log("== Tienda Pet cat food web scraper completed in: " + endTimer + " ms ==")
                let products = handleTableData(data)
                products.forEach(element => {
                    console.log(element.name)
                });
                resolve(products)
            }
        })
    })
}

// Transforms an Objects array into a new Objects array formated for the Product Model
function handleTableData (data) {
    // newData will be an array with the new generated objects
    let newDataArray = []
    // iterate through data to handle the html tables on the price attribute of the data
    data.forEach(product => {
        let htmlTable = product.price
        //.replace(' ', '').replace('/\n/', '').trim()
        // find out how many rows the table data has
        let tr = ocurrences(htmlTable, '<tr>', false)
        // find out how many data points the table has. If it has just one it means the product is out of stock
        let td = ocurrences(htmlTable, '<td>', false)
        // If it has just one td, don't save the product and skip it.
        // If it has more than one td, it means it has at least one product
        if (td != 1) {
            // iterate over the table rows to create new objects (products)
            while (tr > 0) {
                // Remove <span> tags that indicate a discount
                let spanStart = htmlTable.indexOf('<span')
                let spanEnd = htmlTable.indexOf('</span>')

                // Extract the first set of td elements containing the end
                // of the product name
                let startTdName = htmlTable.indexOf('<td>')
                let endTdName = htmlTable.indexOf('</td>')
                // If a span exists, find out if the spans belong to the current row
                endTdName = spanStart > 0 && spanStart < endTdName ? spanStart : endTdName
                let nameEnd = htmlTable.slice(startTdName + '<td>'.length, endTdName)
                // Join the main product name and the end of it that was contained in the <table>
                let newName = product.name.replace('/\n/', '').trim() + ' ' + nameEnd.replace('/\n/', '').trim()
                
                // Extract the second set of td elements containing the price
                let startTdPrice = htmlTable.indexOf('<td>', endTdName)
                let endTdPrice = htmlTable.indexOf('</td>', startTdPrice)
                let newPrice = htmlTable.slice(startTdPrice + '<td>'.length, endTdPrice)
                newPrice = parseInt(newPrice.replace(/[A-z$,.]/g, ''))
    
                // Create the new product to be added to the array
                let newData = new Product(
                    newName,
                    product.href,
                    newPrice,
                    product.imageHref,
                    product.store,
                    product.category,
                    product.animal
                )
                // Truncate the string removing the current <tr>
                let trEnd = htmlTable.indexOf('</tr>')
                htmlTable = htmlTable.slice(trEnd + '</tr>'.length)
                newDataArray.push(newData)
                tr--
            } 
        }
    })
    return newDataArray
}

function Product (name, href, price, imageHref, store, category, animal) {
    this.name = name
    this.href = href
    this.price = price
    this.imageHref = imageHref
    this.store = store
    this.category = category
    this.animal = animal
}

// taken from https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
/* Function that count occurrences of a substring in a string;
* @param {String} string               The string
* @param {String} subString            The sub string to search for
* @param {Boolean} [allowOverlapping]  Optional. (Default:false)
*
* @author Vitim.us https://gist.github.com/victornpb/7736865
* @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
* @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
*
* Used to count number of <tr> in a HTML table
*/
function ocurrences (string, subString, allowOverlaping) {
    // Coerces the types to string in case an integer is input
    string += ""
    subString += ""
    // return (string.length+1) this is to prevent infinity loop when entering occurrence('foo','') will return 4, 
    // because occurrences('','')==1 so occurrence(bar,'')===bar.lenght+1
    // this is the same behavior of regex 
    if (subString.length <= 0) return (string.length + 1)

    let n = 0
    let pos = 0
    let step = allowOverlaping ? 1 : subString.length

    while (true) {
        pos = string.indexOf(subString, pos)
        if(pos >=  0) {
            ++n
            pos += step
        } else break
    }
    return n
}