const UserController = require('../controllers/User.controller')

const routes = (application) => {
  application.post('/user', UserController.createUser)
  application.get('/user', UserController.getAllUsers) //ok att använda /user pga annan metod än ovanför
  application.get('/searchuser', UserController.getUserById)
  application.delete('/user/:userId', UserController.deleteUser) //:userId pga params
  application.put('/user/:userId', UserController.updateUser)
  application.get('/search', UserController.searchUsername)
}

module.exports = { routes }