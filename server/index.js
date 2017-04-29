const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const path = require('path');
const Promise = require('bluebird');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});

module.exports = app;