const User = require('./models/users.js');
const mongoose = require('mongoose');

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);=