const express = require('express');
const routes = require('./controllers/index');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

// Set global var
global.__rootDir = __dirname;

// MongoDB setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST, {
    useMongoClient: true
});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error: '));

app.use('/api', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    res.send("Error 404: File not found...")
    next(err);
})

app.listen(process.env.PORT, () => {
    console.log('App listening on port 3001...');
})