import express from 'express'
import product from './products/products'
import store from './stores/stores'

const router = express.Router()

router.use('/product', product)
router.use('/store', store)

export default router
