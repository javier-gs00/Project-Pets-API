import { Request, Response } from 'express'
import Product from 'Src/models/product.model'

export default async function(req: Request, res: Response) {
  try {
    const { category, store } = req.params
    const products = await Product.find({
      store: new RegExp(store, 'i'),
      category: new RegExp(category, 'i')
    })
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json({ error: true })
  }
}
