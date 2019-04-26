import { Request, Response } from 'express'
import mongoose from 'mongoose'
const Product = mongoose.model('Product')

export default async function(req: Request, res: Response) {
  try {
    const products = await Product.find({ category: new RegExp(req.params.category, 'i') })
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json(err)
  }
}
