const express = require('express')
const path = require('path')
const routes = require('./controllers/index')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

// Set global var
global.__rootDir = __dirname

// MongoDB setup
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/projectpets', {
    useMongoClient: true
}, (err) => {
    if (err) console.log('Err connecting to the db.. err desc=', err)
    console.log('Connection to database succesful')
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error: '))

app.set('port', (process.env.PORT || 3001))
app.use('/api', routes)

//Basic error-handling middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.response || 'Something broke :(...')
})

app.listen(app.get('port'), () => {
    console.log('App listening on port', app.get('port'))
})