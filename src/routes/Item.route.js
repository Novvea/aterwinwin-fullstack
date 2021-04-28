//till vilken url gör vi anropet?
//hur anropas metoden?
const ItemController = require('../controllers/Item.controller')

const routes = (application) => { //här talar vi om vilken metod det är, application för att nå express i Server.js
  application.post('/item', ItemController.addItem)
  application.get('/item', ItemController.getAllItems)
  application.delete('/item/:itemId', ItemController.deleteItem) //:itemId pga params
  application.patch('/item/liked', ItemController.userLikedItem)
  application.patch('/item/disliked', ItemController.userDislikedItem)
  application.get('/items/myuploads', ItemController.getMyItemsFromServer)
}

module.exports = { routes } //skickas sedan till Server.js