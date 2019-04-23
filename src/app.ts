require('dotenv').config()
global.__rootDir = __dirname
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/routes')

const app = express()

mongoose.Promise = global.Promise
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectpets'
mongoose.connect(dbUrl, { useNewUrlParser: true }, function(err) {
	if (err) return console.log(`Error trying to connect to db url ${dbUrl}, desc: `, err)
	console.log(`Succesfully connected to db at: ${dbUrl}`)
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error: '))

const PORT = process.env.PORT || 3001

app.use(cors())

app.use(
	morgan(
		process.env.NODE_ENV !== 'production'
			? 'tiny'
			: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
	)
)

app.use('/api', routes)

app.use((err, req, res, next) => {
	console.log(err)
	res.status(500).send(err.response || 'Something broke :(...')
})

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
}

export default app
