const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('./models/users.js');
const SearchResults = require('./models/searchResults.js');
const UserSubmissions = require('./models/userSubmissions.js');
Promise.promisifyAll(mongoose);

const { user1, user2, user3, user4 } = require('./sampleData.js');

module.exports.getSearchTermData = (words) => {
  return SearchResults.findAsync({})
  .then(data => {
    var result = [];
    data.forEach((element) => {
      if(words.has(element.search_term)) {
        result.push(element);
      }
    });
    return result;
  })
  .then(result => {
    console.log('result', result);
    return result;
  }).catch(error => {
    console.log(error);
    return error;
  })
}

module.exports.checkUserCredentials = (email, password) => {
  return User.findOneAsync({ email, password })
  .then(success => {
    return 'Successfully logged in.';
  })
  .catch(err => {
    console.log('DB: Error in checking user login', err);
  })
}

module.exports.getUserId = (email) => {
  return User.findOneAsync({ email })
  .then(userProfile => {
    if (!userProfile) {
      return undefined;
    }
    return userProfile._id;
  })
};

module.exports.getSearchTermId = (search_term) => {
  return SearchResults.findOneAsync({ search_term })
  .then(searchResult => {
    if (!searchResult) {
      return SearchResults({ search_term }).saveAsync();
    }
    return searchResult._id;
  })
}

module.exports.saveUser = (userCredentials) => {
  return this.getUserId(userCredentials.email)
  .then(userId => {
    if (!userId) {
      return User(userCredentials).saveAsync();
    }
  })
};

module.exports.saveSearchResult = (webData) => {
  return SearchResults.findOneAsync({ search_term: webData.search_term })
  .then(searchResult => {
    if (!searchResult) {
      return SearchResults(webData).saveAsync();
    }
  })
  .catch(err => console.log('Error in saving search result', err));
};

module.exports.saveSubmission = (submission) => {
  // TODO: Pass down email address from req.body
  // TODO: Pass down a search_term
  // TOFIX: Same person can submit same searchTerm with same definition many times
  const email = submission.email;
  const searchTerm = submission.search_term;
  const idsStorage = [];
  idsStorage.push(this.getUserId(email));
  idsStorage.push(this.getSearchTermId(searchTerm));

  return Promise.all(idsStorage)
  .then(resultIds => {
    // TOFIX: Author_ID is empty inside user_submission table at init.
    submission.author_id = resultIds[0];
    submission.search_term_id = resultIds[1];
    submission.submission_content = submission.definition;
    return UserSubmissions(submission).saveAsync();
  })
  .catch(err => console.log('DB: error from saving definition submission', err));
};

module.exports.updateVote = (req, res) => {
  const term = req.query.term;
  if (req.params.voteType === 'upvote') {
    SearchResults.findOneAndUpdate({ search_term: term }, { $inc: { upvotes: 1 } });
  } else if (req.params.voteType === 'downvote') {
    SearchResults.findOneAndUpdate({ search_term: term }, { $inc: { upvotes: -1 } })
  }
  res.end();
};
// TOREMOVE: For dummy data testing only
module.exports.saveUser(user1);
module.exports.saveUser(user2);
module.exports.saveUser(user3);
module.exports.saveUser(user4);
// this.saveSearchResult(searchResult1);
// this.saveSubmission(definitionSubmission1, user1.email, 'earth', 'definition');
// this.saveSubmission({}, user1.email, 'sun', 'searchTerm');
