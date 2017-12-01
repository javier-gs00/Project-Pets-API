const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../../models/products')

// Get all the products with a matching name from a URI query
router.get('/', (req, res) => {
    // Verify that query exists
    if (!req.query.query) {
        return res.json({
            error: "Por favor ingresar algún parámetro de busqueda..."
        });        
    } else {
        Product.findByName(req.query.query).then(results => {
            res.status(200).json(results);
        }).catch(error => {
            throw new Error(`=== Error while searching the db:\n ==== ${error}`);
            res.status(500).json([]);
        });
    };
});

// Save one product
router.post('/', (req, res) => {
    Product.saveOne().then(newDocument => {
        res.status(200).json(newDocument)
    }).catch(jsonRes => {
        res.status(500).json(jsonRes)
    });
});

// Get a product with a given id
router.get('/id/:id', (req, res) => {
    Product.findById(req.params.id).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        throw new Error(`=== Error while searching the db:\n ==== ${error}`);
        res.status(500).json([]);
    });
});

// Edit/Update a product with a given id
router.put('/id/:id', (req, res) => {
    Product.updateOne(req.params.id, req.body, (err, result) => {
        if (err) res.status(500).json(err);
        res.status(200).json(result);
    });
});

// Delete a product with a given id
router.delete('/id/:id', (req, res) => {
    Product.deleteOne(req.params.id, (err, result) => {
        if (err) res.send(500).json(err);
        res.status(200).json(result);
    });
});

// Get all the products from a given category from a store
router.get('/:store/:category', (req, res) => {
    Product.findByStoreAndCateogory(req.params.store, req.params.category, (err, result) => {
        if (err) res.status(500).json(err)
        res.status(200).json(result);
    });
});

// Delete all products of a given category from a store
router.delete('/:store/:category', (req, res) => {
    console.log('check route');
    Product.deleteMany(req.params.store, req.params.category).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    })
});

// Backup Collection to a JSON file
router.get('/backup', (req, res) => {
    Product.backupCollection((err, msg) => {
        console.log('router.get check');
        if (err) return res.status(500).json({ err: 'Backup failed...' });
        return res.status(200).json({ msg: msg});
    })
})

module.exports = router;