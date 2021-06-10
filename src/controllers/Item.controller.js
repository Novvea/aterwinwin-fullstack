const ItemModel = require('../models/Item.model');

const addItem = async (request, response) => {
  const item = new ItemModel({
    name: request.body.name,
    category: request.body.category,
    position: request.body.position,
    url: request.body.url,
    _user: request.body._user,
    interestedUsers: request.body.interestedUsers,
    unInterestedUsers: request.body.unInterestedUsers,
  });
  try {
    const databaseResponse = await item.save();
    response.status(201).send(databaseResponse);
  } catch (error) {
    response.status(500).send({
      message: 'Error while trying to add item',
      stack: error,
    });
  }
};

const getItems = async (request, response) => {
  const { include_items_by_user } = request.query;
  const { exclude_items_by_user } = request.query;

  const filters = {
    ...(include_items_by_user && { _user: include_items_by_user }),
    ...(exclude_items_by_user && { _user: { $ne: exclude_items_by_user } }),
    ...(exclude_items_by_user && {
      uninterestedUsers: { $nin: [exclude_items_by_user] },
    }),
    ...(exclude_items_by_user && {
      interestedUsers: { $nin: [exclude_items_by_user] },
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

const getLikedItems = async (request, response) => {
  const { include_items_liked_by_user } = request.query;

  const filters = {
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
  const itemId = request.params.itemId;
  try {
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
  const { liked_item_id, user_id } = request.body;
  try {
    const likedItemResponse = await ItemModel.findOneAndUpdate(
      { _id: liked_item_id },
      { $addToSet: { interestedUsers: user_id } },
      { returnOriginal: false }
    );
    const matchResponse = await ItemModel.find({
      _user: user_id,
      interestedUsers: { $in: [likedItemResponse._user] },
    });
    response.status(200).send({
      message: 'Liked items array was updated',
      matches: matchResponse,
      likedItemName: likedItemResponse.name,
      likedItemUrl: likedItemResponse.url,
      likedItemId: likedItemResponse._id,
    });
  } catch (error) {
    response.status(500).send({
      message: 'Could not update liked items array',
      stack: error,
    });
  }
};

const updateUserLikedItem = async (request, response) => {
  const { update_item_id } = request.body;
  const { user_id } = request.body;
  try {
    const databaseResponse = await ItemModel.findOneAndUpdate(
      { _id: update_item_id },
      { $pull: { interestedUsers: user_id } },
      { returnOriginal: false }
    );
    response.status(200).send({
      message: 'Item was no longer liked by user',
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
  getLikedItems,
  deleteItem,
  userLikedItem,
  updateUserLikedItem,
  userDislikedItem,
};
