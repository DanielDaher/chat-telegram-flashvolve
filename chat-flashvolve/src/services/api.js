import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3001';

function fetchData(endpoint) {
  console.log(`${axios.defaults.baseURL}/${endpoint}`)
  return axios.post(`${axios.defaults.baseURL}/${endpoint}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}

export { fetchData };
