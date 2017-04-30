const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchResultsSchema = mongoose.Schema({
    search_term: { type: String, required: true },
    definition: { type: String, default: null },
    image: { type: String, default: null },
    image_url: { type: String, default: null },
});

const SearchResults = mongoose.model('Search_Results', SearchResultsSchema);

module.exports = SearchResults;
