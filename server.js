const express = require('express')
const cors = require('cors')
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

// Set PORT and CORS configuration 
app.set('port', (process.env.PORT || 3001))
const whitelist = ['https://project-pets-client.herokuapp.com/']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
app.use('/api', routes)

//Basic error-handling middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.response || 'Something broke :(...')
})

app.listen(app.get('port'), () => {
    console.log('App listening on port', app.get('port'))
})