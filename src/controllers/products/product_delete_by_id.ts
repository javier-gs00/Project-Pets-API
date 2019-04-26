import { Request, Response } from 'express'
import mongoose from 'mongoose'
const Product = mongoose.model('Product')

export default function(req: Request, res: Response) {
  Product.deleteOne(req.params.id, err => {
    if (err) return res.send(500).json(err)
    return res.status(200).json({ success: true })
  })
}
