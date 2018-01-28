const router = require('express').Router()
const mongoose = require('mongoose')
const Store = require('../../models/stores')

router.get('/', (req, res) => {
    Store.find()
    .then(results => {
        return res.status(200).json(results)
    })
    .catch(err => {
        console.error('An error ocurred while getting the stores', err)
        return res.status(500).json([])
    })
})

module.exports = router