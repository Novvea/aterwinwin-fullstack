//här skriver vi logiken som talar om vad som händer när vi gör ett anrop
import ItemModel from '../models/Item.model.js'

//async await pga att mongoose måste koppla upp sig tyill databasen, vi väntar tills processen är färdig innan vi gör något annat
const addItem = async (request, response) => { //request = den data som skickas till anropet, response är det servern svarar med

  const item = new ItemModel({
    name: request.body.name,//ska peka på den data som ska skickas till servern
    category: request.body.category,
    url: request.body.url,
    owner: request.body.owner,
    interestedUsers: request.body.interestedUsers,
    unInterestedUsers: request.body.unInterestedUsers
  })

  try {
    const databaseResponse = await item.save() //spara data som skickas till servern i databasen
    response.status(201).send(databaseResponse)//om det går som planerat vill vi tala om det, vi skickar tillbaka ett svar från servern och datan
  } catch (error) {
    response.status(500).send({ //men nådde i alla fall fram till servern
      message: 'Error while trying to add item',
      stack: error
    })
  }
}
const getAllItems = async (request, response) => {
  try {
    const databaseResponse = await ItemModel.find()
    response.status(200).send(databaseResponse)
  } catch (error) {
    response.status(500).send({
      message: error.message
    })
  }
}

const deleteItem = async (request, response) => {
  try {
    const itemId = request.params.itemId
    const databaseResponse = await ItemModel.findByIdAndDelete(itemId)//ska hitta en vara baserat på id och sedan deleta
    response.status(200).send({ message: 'Successfully deleted item', data: databaseResponse })
  } catch (error) {
    response.status(500).send({
      message: `Error while trying to delete item with ID ${itemId}`
    })
  }
}

const userLikedItem = async (request, response) => {

  const databaseResponse = await ItemModel.update() //CHANGE TO SOME KIND OF UPDATE

}

export default {
  addItem,
  getAllItems,
  deleteItem,
  userLikedItem
}