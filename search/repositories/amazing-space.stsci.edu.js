const cheerio = require('cheerio');
const request = require('request-promise');

const search_matchs = (query) => {
  return (object) => {
    return object.title.toUpperCase().includes(query.toUpperCase());
  }
}

module.exports = (query) => {
  return request(`https://amazing-space.stsci.edu/glossary`)
    .then(body => {
      const $ = cheerio.load(body);
      const out = [];

      $('.section_title').map((e, item) => {
        const current = $(item);

        out.push({ 
          title: current.text().trim(),
          text: current.next('.section_content.sub_divider').text().trim()
        });
      });

      return out;
    })
    .filter(search_matchs(query));
}
