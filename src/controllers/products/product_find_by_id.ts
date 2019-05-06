import { Request, Response } from 'express'
import Product from 'Src/models/product.model'

export default async function(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id)
    return res.status(200).json(product)
  } catch (err) {
    console.log(`Could not find the product with id: ${req.params.id}`, err)
    return res.status(500).json({ error: true })
  }
}
