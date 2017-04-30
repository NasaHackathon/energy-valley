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

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

app.post('/api/user/words', rh.getCacheData);\

app.get('/search', rh.searchQueryResults);

// voteType can be either upvote or downvote
app.route('/api/:voteType')
   .put(dbh.updateVote);

app.post('/postDefinition', rh.storeNewDefinition);

// TOFIX: This has to take in the query from PUT request
// TOFIX: This has totake in the query from PUT request
search('sun').then(result => rh.handleSearchResult(result));
search('earth').then(result => rh.handleSearchResult(result));
search('moon').then(result => rh.handleSearchResult(result));
search('venus').then(result => rh.handleSearchResult(result));
search('mars').then(result => rh.handleSearchResult(result));
search('jupiter').then(result => rh.handleSearchResult(result));
search('saturn').then(result => rh.handleSearchResult(result));
search('neptune').then(result => rh.handleSearchResult(result));
search('uranus').then(result => rh.handleSearchResult(result));
search('pluto').then(result => rh.handleSearchResult(result));
search('Nebula').then(result => rh.handleSearchResult(result));

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});

module.exports = app;
