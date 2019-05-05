import { Request, Response } from 'express'
import Product from 'Src/models/product.model'

export default async function(req: Request, res: Response) {
  try {
    await Product.deleteOne(req.params.id)
    return res.status(200).json({ success: true })
  } catch (err) {
    return res.send(500).json({ error: true })
  } 
}
