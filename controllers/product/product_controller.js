const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../../models/products')

// Get all the products with a matching name
router.get('/', (req, res) => {
    // Verify that query exists
    if (!req.query.query) {
        return res.json({
            error: "Por favor ingresar algún parámetro de busqueda..."
        });        
    } else {
        Product.findByName(req.query.query)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            throw new Error(`=== Error while searching the db:\n ==== ${error}`);
            res.status(500).json([]);
        });
    };
});

// Get a product with a given id
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        throw new Error(`=== Error while searching the db:\n ==== ${error}`);
        res.status(500).json([]);
    });
});

// Save one product
router.post('/', (req, res) => {
    Product.saveOne()
    .then(newDocument => {
        res.status(200).json(newDocument)
    })
    .catch(jsonRes => {
        res.status(500).json(jsonRes)
    });
})

module.exports = router;