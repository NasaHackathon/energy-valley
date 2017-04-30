const _ = require('lodash');
const request = require('request-promise');

module.exports = (searchTerm) => {
  return request({
    uri: `https://images-api.nasa.gov/search?q=${searchTerm}&page=1&media_type=image&year_start=1920&year_end=2017`,
    json: true
  })
  .then(body => {
    return _.get(body, 'collection.items.0.links.0.href')
  });
}
