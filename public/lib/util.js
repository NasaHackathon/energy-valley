import axios from 'axios';

const submitNewDefinition = (email, search_term, definition) => {
  return axios.post('/postDefinition', {
    params: { email, search_term, definition }
  });
}

export { submitNewDefinition };
