const express = require('express')
// const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
require('./models/products')
const routes = require('./controllers/index')

const app = express()
require('dotenv').config()

// Set global var
global.__rootDir = __dirname

// MongoDB setup
mongoose.Promise = global.Promise
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectpets'
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true },
  function(err) {
    if (err) return console.log(`Error trying to connect to db url ${dbUrl}, desc: `, err)
    console.log(`Succesfully connected to db at: ${dbUrl}`)
  }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error: '))

// Set PORT and CORS configuration
app.set('port', process.env.PORT || 3001)
// const whitelist = ['https://project-pets-client.herokuapp.com/', 'http://localhost:3000']
// const corsOptions = {
//     origin: function (origin, callback) {
//         // allow requests with no origin
//         // (like mobile apps or curl requests)
//         // if(!origin) return callback(null, true)
//         console.log('======= ORIGIN ========')
//         console.log(origin)
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions))

// Add headers
// app.use(function (req, res, next) {
//     console.log('======= REQUEST HEADERS ========')
//     console.log(req.header)

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://project-pets-client.herokuapp.com/');
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', false);

//     console.log('======= RESPONSE HEADERS ========')
//     console.log(res.headers)
//     // Pass to next layer of middleware
//     next();
// });

app.use('/api', routes)

//Basic error-handling middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.response || 'Something broke :(...')
})

module.exports = app
