const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
