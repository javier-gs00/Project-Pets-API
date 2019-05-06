import express, { Request, Response } from 'express'
import apiRouter from './api'

const router = express.Router()

router.get('/', (req: Request, res: Response) => res.status(200).send('Project Pets API'))
router.use('/api', apiRouter)

export default router
