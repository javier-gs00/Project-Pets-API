const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const router = require('express').Router()

// Get all the products with a matching name from a URI query
router.get('/', (req, res) => {
  if (!req.query.query) {
    return res.json({
      error: 'Error: No search query received...'
    })
  } else {
    Product.findByName(req.query.query)
      .then(results => {
        return res.status(200).json(results)
      })
      .catch(error => {
        throw new Error(`=== Error while searching the db:\n ==== ${error}`)
        return res.status(500).json([])
      })
  }
})

// Save one product
router.post('/', (req, res) => {
  Product.saveOne()
    .then(newDocument => {
      return res.status(200).json(newDocument)
    })
    .catch(jsonRes => {
      return res.status(500).json(jsonRes)
    })
})

// Get a product with a given id
router.get('/id/:id', (req, res) => {
  Product.findById(`${req.params.id}`, (err, data) => {
    if (err) {
      console.log(`=== Error while searching the db:\n ==== ${error}`)
      return res.status(500).json([])
    }

    console.log(`Route response result: ${result}`)
    return res.status(200).json(result)
  })
})

// Edit/Update a product with a given id
router.put('/id/:id', (req, res) => {
  Product.updateOne(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
})

// Delete a product with a given id
router.delete('/id/:id', (req, res) => {
  Product.deleteOne(req.params.id, err => {
    if (err) return res.send(500).json(err)
    return res.status(200).json({ success: true })
  })
})

// Get all the products from a given category
router.get('/category/:category', (req, res) => {
  Product.findByCategory(req.params.category, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
})

// Get all the products from a given category from a store
router.get('/:store/:category', (req, res) => {
  Product.findByStoreAndCateogory(req.params.store, req.params.category, (err, result) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(result)
  })
})

// Delete all products of a given category from a store
router.delete('/:store/:category', (req, res) => {
  Product.deleteMany(req.params.store, req.params.category)
    .then(result => {
      return res.status(200).json(result)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

// Backup Collection to a JSON file
router.get('/backup', (req, res) => {
  Product.backupCollection((err, msg) => {
    if (err) return res.status(500).json({ err: 'Backup failed...' })
    return res.status(200).json({ msg: msg })
  })
})

module.exports = router
