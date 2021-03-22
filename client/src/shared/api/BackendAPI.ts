import Axios from 'axios'

const developmentURL = 'http://localhost:3001'
/* const productionURL = */ //en ip-adress till där backend är hosted

const BackendAPI = Axios.create({
  baseURL: developmentURL
})

export default BackendAPI