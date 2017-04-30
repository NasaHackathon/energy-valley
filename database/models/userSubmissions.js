const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSubmissionsSchema = mongoose.Schema({
    author_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, default: null }],
    search_term_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Search_Results', default: null }],
    submission_type: { type: String, required: true}, // submission_type: 'definition' or 'searchTerm'
    submission_content: { type: String, defualt: null },
    submission_count: { type: Number, default: null },
    submission_time: { type: Date, default: Date.now },
});

const UserSubmissions = mongoose.model('User_Submissions', UserSubmissionsSchema);

module.exports = UserSubmissions;
