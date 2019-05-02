import { Request, Response } from 'express'
import { backupCollection } from 'Src/models/product.model'

export default async function(req: Request, res: Response) {
  try {
    const msg = await backupCollection()
    return res.status(200).json({ msg })
  } catch(err) {
    return res.status(500).json({ err: 'Backup failed...' })
  }
}
