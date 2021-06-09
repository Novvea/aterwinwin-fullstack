const UserController = require('../controllers/User.controller');

const routes = (app) => {
  app.post('/user', UserController.createUser);
  app.get('/user', UserController.getAllUsers);
  app.get('/searchuser', UserController.getUserById);
  app.delete('/user/:userId', UserController.deleteUser);
  app.put('/user/:userId', UserController.updateUser);
  app.get('/search', UserController.searchUsername);
};

module.exports = { routes };
