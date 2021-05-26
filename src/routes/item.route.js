//till vilken url gör vi anropet?
//hur anropas metoden?
const ItemController = require('../controllers/Item.controller');

const routes = (app) => {
  //här talar vi om vilken metod det är, app för att nå express i Server.js
  app.post('/item', ItemController.addItem);
  app.get('/item', ItemController.getAllItems);
  app.delete('/item/:itemId', ItemController.deleteItem); //:itemId pga params
  app.patch('/item/liked', ItemController.userLikedItem);
  app.patch('/item/disliked', ItemController.userDislikedItem);
  app.get('/items/myuploads', ItemController.getMyItemsFromServer);
};

module.exports = { routes }; //skickas sedan till Server.js
