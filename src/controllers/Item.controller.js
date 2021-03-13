//här skriver vi logiken som talar om vad som händer när vi gör ett anrop
import ItemModel from '../models/Item.model.js'

//async await pga att mongoose måste koppla upp sig tyill databasen, vi väntar tills processen är färdig innan vi gör något annat
const addItem = async (request, response) => { //request = den data som skickas till anropet, response är det servern svarar med

  const item = new ItemModel({
    itemname: request.body.itemname,//ska peka på den data som ska skickas till servern
    category: request.body.category
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

export default {
  addItem,
  getAllItems
}