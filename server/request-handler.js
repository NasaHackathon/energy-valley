'user strict';

const userSub = require('../database/models/userSubmissions.js');
const user = require('../database/models/users.js');

exports.postDefinition = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let term = req.body.term;
  let defintion = req.body.definition;
  let searchTerm = req.body.searchTerm;
  console.log('req', req);
  res.json('done');
}