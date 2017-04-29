const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const path = require('path');
const Promise = require('bluebird');

const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.urlencoded({extended: true}));

// const testFn = () => console.log('this is good');

app.get('/getKeywordData', testFn);

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});

module.exports = app;