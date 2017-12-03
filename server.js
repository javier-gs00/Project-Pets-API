const express = require('express');
const path = require('path');
const routes = require('./controllers/index');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

// Set global var
global.__rootDir = __dirname;

// MongoDB setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/projectpets', {
    useMongoClient: true
});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error: '));

app.set('port', (process.env.PORT || 3001));
app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'build')));

// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//     let err = new Error('Not found');
//     err.status = 404;
//     res.send("Error 404: File not found...")
//     next(err);
// })
//Basic error-handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.response || 'Something broke :(...');
})

// app.listen(process.env.PORT || 3001, () => {
//     const port = process.env.PORT;
//     console.log(`App listening on port ${port}`);
// })
app.listen(app.get('port'), () => {
    console.log('App listening on port', app.get('port'));
})