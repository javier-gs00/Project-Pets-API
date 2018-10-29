const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const router = require('express').Router()

router.get('/', async (req, res) => {
  Store.find()
    .then(results => {
      return res.status(200).json(results)
    })
    .catch(err => {
      console.error('An error ocurred while getting the stores list', err)
      return res.status(500).json([])
    })
})

router.get('/:name', async (req, res) => {
  Store.findOne(req.params.name)
    .then(results => {
      return res.status(200).json(results)
    })
    .catch(err => {
      console.error(`An error ocurred while searching for the store ${req.params.name}`)
      return res.status(500).json({ error: true })
    })
})

module.exports = router
