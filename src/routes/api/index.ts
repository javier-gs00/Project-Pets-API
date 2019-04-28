import express from 'express'
import productRouter from './products'
import storeRouter from './stores'

const router = express.Router()

router.use('/product', productRouter)
router.use('/store', storeRouter)

export default router