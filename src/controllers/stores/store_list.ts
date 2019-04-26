import { Request, Response } from 'express'
import mongoose from 'mongoose'
const Store = mongoose.model('Store')

export default async function(req: Request, res: Response) {
  try {
    const stores = await Store.find()
    return res.status(200).json(stores)
  } catch (err) {
    console.error('An error ocurred while getting the stores list', err)
    return res.status(500).json([])
  }
}
