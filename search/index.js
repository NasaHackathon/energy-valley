const _ = require('lodash');
const Promise = require('bluebird');

function search_in(resource, query) {
    return require(`./repositories/${resource}`)(query);
}

module.exports = (q) => {
  return Promise.all([
    search_in('images-api.nasa.gov', q),
    search_in('amazing-space.stsci.edu', q),
    search_in('nasa.gov-acronyms', q)
  ])
  .spread((imageUrl, descriptions, glosary) => {
    if (glosary.length) 
    return {
      search_term: glosary.title,
      definition: glosary.text
    };

    return {
      search_term: _.first(descriptions).title,
      definition: _.first(descriptions).text,
      image: imageUrl
    }
  });
}