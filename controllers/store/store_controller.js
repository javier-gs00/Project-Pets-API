const router = require('express').Router()
const mongoose = require('mongoose')
const Store = require('../../models/stores')

router.get('/', async (req, res) => {
    // Store.find()
    // .then(results => {
    //     return res.status(200).json(results)
    // })
    // .catch(err => {
    //     console.error('An error ocurred while getting the stores list', err)
    //     return res.status(500).json([])
    // })
    const stores = await Store.find()
    if (stores.error) return res.status(500).json(stores)
    return res.status(200).json(stores)
})

router.get('/:name', async (req, res) => {
    // Store.findOne(req.params.name)
    // .then(results => {
    //     return res.status(200).json(results)
    // })
    // .catch(err => {
    //     console.error(`An error ocurred while searching for the store ${req.params.name}`)
    //     return res.status(500).json({error: true})
    // })
    const store = await Store.findOne(req.params.name)
    if (store.error) return res.status(500).json(store)
    return res.status(200).json(store)
})

module.exports = router