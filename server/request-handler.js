'user strict';

const userSub = require('../database/models/userSubmissions.js');
const user = require('../database/models/users.js');
const dbh = require('../database/db_helpers');
const search = require('../search/index.js');

exports.postDefinition = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let term = req.body.term;
  let defintion = req.body.definition;
  let searchTerm = req.body.searchTerm;
  res.json('done');
}

// >>> TOFIX: These functions will be moved to requestHandler.js after Jason has done a PR
module.exports.verifyUserLogin = (req, res, next) => {
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
// <<<

module.exports.search = (req, res) => {
  search(req.query.q)
  .then((queryResults) => {
    res.status(200).send(queryResults);
  })
  .catch(() => {
    res.statusCode(500);
  });
};
