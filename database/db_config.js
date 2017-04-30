const mongoose = require('mongoose');
console.log('env', process.env);
console.log('process ', process.env.MONGODB_URI);
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/nasa';

mongoose.connect(dbUrl);
const db = mongoose.connection;
const dbh = require('./db_helpers.js');

db.on('error', (error) => {
  console.log('There was an error with the database: ', error);
});

db.once('open', (status) => {
  console.log('Database is running.')
});

module.exports = db;
