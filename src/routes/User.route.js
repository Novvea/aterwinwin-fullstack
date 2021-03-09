import UserController from '../controllers/User.controller.js'
import UserModel from '../models/User.model.js'

const routes = (application) => {
  application.post('/user', UserController.createUser)
  application.get('/user', UserController.getAllUsers) //ok att använda /user pga annan metod än ovanför
  application.delete('/user/:userId', UserController.deleteUser) //:userId pga params
}

export default { routes }