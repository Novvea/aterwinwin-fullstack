import Axios from 'axios';

const developmentURL = 'http://localhost:5000';
//const productionURL = 'https://aterwinwin-backend.herokuapp.com'

const BackendAPI = Axios.create({
  baseURL: developmentURL,
  //baseURL: productionURL
});

export default BackendAPI;
