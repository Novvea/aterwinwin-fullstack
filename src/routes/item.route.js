const ItemController = require('../controllers/Item.controller');

const routes = (app) => {
  app.post('/item', ItemController.addItem);
  app.get('/item', ItemController.getItems);
  app.get('/item/liked', ItemController.getLikedItems);
  app.delete('/item/:itemId', ItemController.deleteItem); //:itemId pga params
  app.patch('/item/liked', ItemController.userLikedItem);
  app.patch('/item/update', ItemController.updateUserLikedItem);
  app.patch('/item/disliked', ItemController.userDislikedItem);
};

module.exports = { routes };
