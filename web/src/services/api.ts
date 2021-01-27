import axios from 'axios';

//baseURL: 'http://174.138.59.197:3333'

const api = axios.create({
  baseURL: 'http://174.138.59.197:3333',
});

export default api;
