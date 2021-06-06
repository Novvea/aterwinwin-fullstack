import Axios from 'axios';

const BackendAPI = Axios.create({
  baseURL: 'https://aterwinwin-fullstack.herokuapp.com',
});

export default BackendAPI;
