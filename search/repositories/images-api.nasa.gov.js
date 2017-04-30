const _ = require('lodash');
const request = require('request-promise');

module.exports = function (q) {
  return request({
    uri: `https://images-api.nasa.gov/search?q=${q}&page=1&media_type=image&year_start=1920&year_end=2017`,
    json: true
  })
  .then(body => {
    return _.get(body, 'collection.items.0.links.0.href')
  });
}
