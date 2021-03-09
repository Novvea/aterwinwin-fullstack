import UserController from '../controllers/User.controller.js'

const routes = (application) => {
  application.post('/user', UserController.createUser)
  application.get('/user', UserController.getAllUsers) //ok att använda /user pga annan metod än ovanför
  application.get('/user/:userId', UserController.getUserById)
  application.delete('/user/:userId', UserController.deleteUser) //:userId pga params
}

export default { routes }