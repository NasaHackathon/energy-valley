'user strict';

const _ = require('lodash');
const cheerio = require('cheerio');

const userSub = require('../database/models/userSubmissions.js');
const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');
const search = require('../search/index.js');

module.exports.storeNewDefinition = function(req, res) {
  const email = req.query.email;
  const search_term = req.query.search_term;
  const definition = req.query.definition;
  return dbh.saveSubmission({}, email, search_term, 'definition')
  .then(success => {
    res.status(200).send(success);
  })
  .catch(err => {
    console.log('RH: Error storing new definition', err);
    res.status(500);
  })
}

module.exports.getCacheData = function(req, res) {
  /*
  var stuff = '';
  req.on('data', (chunk) => {
    console.log('chunk', chunk);
    stuff += chunk;
  });
  req.on('end', function() {
    console.log('body', stuff);
  })
  */
  console.log('req body', req.body);
  const body = req.body.body
  const bodySplit = body.trim().toLowerCase().replace( /\W/g, ' ').split(' ');
  // console.log('bopdySplit', bodySplit);
  var mySet = new Set();

  bodySplit.forEach((element) => {
    mySet.add(element);
  });

  console.log('myset', mySet);
  dbh.getSearchTermData(mySet)
  .then(data => {
    console.log('************' , data);
    res.json(data);
  }); 
}

module.exports.verifyUserLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  return dbh.checkUserCredentials(email, password)
  .then(message => {
    return message;
  })
  .catch(err => {
    console.log('RH: Error verifying user login', err);
  })
}

module.exports.handleSearchResult = (webData) => {
  return dbh.saveSearchResult(webData)
  .catch(err => console.log('RH: Error handling search result', err));
}

module.exports.searchQueryResults = (req, res) => {
  search(req.query.q)
  .then((queryResults) => {
    res.status(200).send(queryResults);
  })
  .catch(() => {
    res.status(500);
  });
};
