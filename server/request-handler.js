'user strict';

const _ = require('lodash');
const cheerio = require('cheerio');

const userSub = require('../database/models/userSubmissions.js');
const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');
const search = require('../search/index.js');

module.exports.postDefinition = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let term = req.body.term;
  let defintion = req.body.definition;
  let searchTerm = req.body.searchTerm;
  res.json('done');
}

module.exports.getCacheData = function(req, res) {
  const body = req.body.body
  const bodySplit = body.split(' ');
  var mySet = new Set();

  bodySplit.forEach((element) => {
    mySet.add(element);
  });

  dbh.getSearchTermData(mySet)
  .then()

  var words = ['moon', 'earth', 'sun'];





  //Reduce
  // const words = bodySplit.reduce((acc, cur) => {
  //   if (acc[cur] === undefined) {
  //     acc[cur] = 1;
  //   } else {
  //     acc[cur]++;
  //   }
  //   return acc;
  // }, {});
  const wordsArray = 
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
