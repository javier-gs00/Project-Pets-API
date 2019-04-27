import { Request, Response } from 'express'
import mongoose from 'mongoose'
const Product = mongoose.model('Product')

export default async function(req: Request, res: Response) {
  try {
    const { category, store } = req.params
    const result = await Product.deleteMany({ category, store })
    // result is DeleteWriteOpResultObject which contains the deleted count
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json(err)
  }
}
