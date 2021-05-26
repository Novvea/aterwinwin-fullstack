import Axios from 'axios';

const BackendAPI = Axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
});

export default BackendAPI;
