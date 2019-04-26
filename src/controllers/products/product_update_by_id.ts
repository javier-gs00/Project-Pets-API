import { Request, Response } from 'express'
import mongoose from 'mongoose'
const Product = mongoose.model('Product')

export default async function(req: Request, res: Response) {
  try {
    const _id = req.params.id
    const data = req.body
    const product = await Product.findOneAndUpdate({ _id }, data, { new: true })
    return res.status(200).json(product)
  } catch (err) {
    console.log(`Error updating product with id ${req.params.id}, err: `, err)
    return res.status(500).json({ err })
  }
}
