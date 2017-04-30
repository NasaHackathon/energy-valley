import axios from 'axios';

const getUserData = () => {
  return axios.post('/getUserData');
}

export { getKeywordData };
