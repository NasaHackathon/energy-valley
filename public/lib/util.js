import axios from 'axios';

const getKeywordData = () => {
  return axios.get('/getKeywordData');
}

export { getKeywordData };
