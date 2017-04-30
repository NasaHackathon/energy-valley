'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('../database/db_config.js');
const dbh = require('../database/db_helpers');
const path = require('path');
const rh = require('./request-handler.js');
const Promise = require('bluebird');
const search = require('../search/');

const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.urlencoded({extended: true}));

// >>> TOFIX: Remove below testFn when we have incoming GET request from client
const testFn = () => console.log('this is good');
app.get('/getKeywordData', testFn);
// <<<

app.route('/api/user/post')
  .post(rh.postDefinition);

app.get('/search', rh.search);

// TOFIX: This has to take in the query from PUT request
search('sun').then(result => rh.handleSearchResult(result));
search('earth').then(result => rh.handleSearchResult(result));

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});

module.exports = app;

