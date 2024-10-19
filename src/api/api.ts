import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sw-api.starnavi.io/',
});

export default api;