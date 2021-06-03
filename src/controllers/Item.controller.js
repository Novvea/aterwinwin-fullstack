//här skriver vi logiken som talar om vad som händer när vi gör ett anrop
const ItemModel = require('../models/Item.model');

//async await pga att mongoose måste koppla upp sig tyill databasen, vi väntar tills processen är färdig innan vi gör något annat
const addItem = async (request, response) => {
  //request = den data som skickas till anropet, response är det servern svarar med
  const item = new ItemModel({
    name: request.body.name, //ska peka på den data som ska skickas till servern
    category: request.body.category,
    position: request.body.position,
    url: request.body.url,
    _user: request.body._user, //the id comes from mongoose and mongodb
    interestedUsers: request.body.interestedUsers,
    unInterestedUsers: request.body.unInterestedUsers,
  });
  try {
    const databaseResponse = await item.save(); //spara data som skickas till servern i databasen
    response.status(201).send(databaseResponse); //om det går som planerat vill vi tala om det, vi skickar tillbaka ett svar från servern och datan
  } catch (error) {
    response.status(500).send({
      //men nådde i alla fall fram till servern
      message: 'Error while trying to add item',
      stack: error,
    });
  }
};

const getItems = async (request, response) => {
  const { include_items_by_user } = request.query;
  const { exclude_items_by_user } = request.query;
  const { include_items_liked_by_user } = request.query;

  const filters = {
    ...(include_items_by_user && { _user: include_items_by_user }),
    ...(exclude_items_by_user && { _user: { $ne: exclude_items_by_user } }),
    ...(exclude_items_by_user && {
      uninterestedUsers: { $nin: [exclude_items_by_user] },
    }),
    ...(exclude_items_by_user && {
      interestedUsers: { $nin: [exclude_items_by_user] },
    }),
    ...(include_items_liked_by_user && {
      interestedUsers: { $in: [include_items_liked_by_user] },
    }),
  };
  try {
    const databaseResponse = await ItemModel.find({ ...filters });
    response.status(200).send(databaseResponse);
  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
};

const deleteItem = async (request, response) => {
  try {
    const itemId = request.params.itemId;
    const databaseResponse = await ItemModel.findByIdAndDelete(itemId); //ska hitta en vara baserat på id och sedan deleta
    response
      .status(200)
      .send({ message: 'Successfully deleted item', data: databaseResponse });
  } catch (error) {
    response.status(500).send({
      message: `Error while trying to delete item with ID ${itemId}`,
    });
  }
};

const userLikedItem = async (request, response) => {
  const itemId = request.body.id;
  const userid = request.body.userid;
  console.log('yserid: ', userid);
  try {
    const databaseResponse = await ItemModel.findOneAndUpdate(
      { _id: itemId },
      { $addToSet: { interestedUsers: userid } }
    );
    response.status(200).send({
      message: 'Liked items array was updated',
      data: databaseResponse,
    });
  } catch (error) {
    response.status(500).send({
      message: 'Could not update liked items array',
      stack: error,
    });
  }
};

const userDislikedItem = async (request, response) => {
  const itemId = request.body.id;
  const userid = request.body.userid;
  try {
    const databaseResponse = await ItemModel.findOneAndUpdate(
      { _id: itemId },
      { $addToSet: { uninterestedUsers: userid } }
    );
    response.status(200).send({
      message: 'Disliked items array was updated',
      data: databaseResponse,
    });
  } catch (error) {
    response.status(500).send({
      message: 'Could not update unintrestedUsers array',
      stack: error,
    });
  }
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
  userLikedItem,
  userDislikedItem,
};
