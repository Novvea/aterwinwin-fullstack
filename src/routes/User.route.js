import UserController from '../controllers/User.controller.js'

const routes = (application) => {
  application.post('/user', UserController.createUser)
}

export default { routes }