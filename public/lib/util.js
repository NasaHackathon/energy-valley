import axios from 'axios';

const getKeywordData = () => {
  return axios.get('/getKeywordData');
}

const getUserData = () => {
  return axios.post('/getUserData');
}

export { getKeywordData };
