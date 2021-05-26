const UserController = require('../controllers/User.controller');

const routes = (app) => {
  app.post('/user', UserController.createUser);
  app.get('/user', UserController.getAllUsers); //ok att använda /user pga annan metod än ovanför
  app.get('/searchuser', UserController.getUserById);
  app.delete('/user/:userId', UserController.deleteUser); //:userId pga params
  app.put('/user/:userId', UserController.updateUser);
  app.get('/search', UserController.searchUsername);
};

module.exports = { routes };
