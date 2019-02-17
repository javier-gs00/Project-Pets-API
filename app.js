require('dotenv').config()
global.__rootDir = __dirname
const express = require('express')
const mongoose = require('mongoose')
require('./models/products')
require('./models/stores')
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

app.set('port', process.env.PORT || 3001)

app.use('/api', routes)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.response || 'Something broke :(...')
})

module.exports = app
