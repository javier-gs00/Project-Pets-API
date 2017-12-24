const router = require('express').Router()
const mongoose = require('mongoose')
const Store = require('../../models/stores')

router.get('/', (req, res) => {
    Store.find()
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.error('An error ocorred while getting the stores', err)
        res.status(500).json([])
    })
})

module.exports = router