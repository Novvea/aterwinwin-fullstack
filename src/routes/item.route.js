const ItemController = require('../controllers/Item.controller');

const routes = (app) => {
  //här talar vi om vilken metod det är, app för att nå express i Server.js
  app.post('/item', ItemController.addItem);
  app.get('/item', ItemController.getItems);
  app.get('/item/liked', ItemController.getLikedItems);
  app.delete('/item/:itemId', ItemController.deleteItem); //:itemId pga params
  app.patch('/item/liked', ItemController.userLikedItem);
  app.patch('/item/disliked', ItemController.userDislikedItem);
};

module.exports = { routes }; //skickas sedan till Server.js
