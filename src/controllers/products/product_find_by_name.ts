import { Request, Response } from 'express'
import Product from 'Src/models/product.model'

export default async function(req: Request, res: Response) {
  if (!req.query.query) {
    return res.json({
      error: 'Error: No search query received...'
    })
  } else {
    try {
      const products = await Product.find({ name: { $regex: req.query.query, $options: 'i' } })
      return res.status(200).json(products)
    } catch (err) {
      return res.status(500).json({ error: true })
    }
  }
}
