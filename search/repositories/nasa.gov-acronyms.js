const _ = require('lodash');
const cheerio = require('cheerio');
const request = require('request-promise');

function search_matchs(query) {
  return (object) => {
    return object.title.toUpperCase().includes(query.toUpperCase());
  }
}

module.exports = function (q) {
  return request({
      uri: `https://www.nasa.gov/api/1/record/node/366819.json`,
      json: true
    })
    .then(json => {
      const $ = cheerio.load(`<div>${json.ubernode.body}</div>`);
      const out = [];

      $('div p b').each((e, item) => {
        const current = $(item);

        out.push({
          title: current.text().trim(),
          text: (_.get(item, 'next.data') || '').trim().replace('— ', '')
        });
      });

      return out;
    })
    .filter(search_matchs(q));
}
