const User = require('./models/users.js');
const SearchResults = require('./models/searchResults.js');
const UserSubmissions = require('./models/userSubmissions.js');
const mongoose = require('mongoose');

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
