//till vilken url gör vi anropet?
//hur anropas metoden?
import ItemController from '../controllers/Item.controller.js'

const routes = (application) => { //här talar vi om vilken metod det är, application för att nå express i Server.js
  application.post('/item', ItemController.addItem)
  application.get('/item', ItemController.getAllItems)
  application.delete('/item/:itemId', ItemController.deleteItem) //:itemId pga params
  application.patch('/item/liked', ItemController.userLikedItem)
}

export default { routes } //skickas sedan till Server.js