import dotenv from 'dotenv'
dotenv.config()
import express, { Express, ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import db from './db'
import routes from './routes'

async function App(): Promise<Express> {
	if (process.env.NODE_ENV !== 'test') {
		await db.init()
	}

	const app: Express = express()
	
	app.set('PORT', process.env.PORT || 8000)
	
	app.use(cors())
	
	app.use(
		morgan(
			process.env.NODE_ENV !== 'production'
				? 'tiny'
				: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
		)
	)
	
	app.use('/', routes)
	
	app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
		console.log('Express error middleware', err)
		res.status(500).send(err || 'Something broke :(...')
	})

	return app
}

export default App
