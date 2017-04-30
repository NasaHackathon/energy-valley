const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchResultsSchema = mongoose.Schema({
    search_term: { type: String, required: true, lowercase: true },
    definition: { type: String, default: null },
    image_url: { type: String, default: null },
    upvotes: { type: Number, default: 0 }
});

const SearchResults = mongoose.model('Search_Results', SearchResultsSchema);

module.exports = SearchResults;
