import http from '../BackendAPI';

const createUser = (data) => {
  return http.post('/user', data);
};

const getAllUsers = () => {
  return http.get('/user');
};

const addItem = (data) => {
  console.log('data:', data);
  return http.post('/item', data);
};

const getAllItems = (exclude_items_by_user) => {
  return http.get('/item', { params: { exclude_items_by_user } });
};

const getItemsByUser = (include_items_by_user) => {
  return http.get('/item', { params: { include_items_by_user } });
};

const getLikedItemsByUser = (include_items_liked_by_user) => {
  return http.get('/item/liked', { params: { include_items_liked_by_user } });
};

const userLikedItem = (user_liked_item) => {
  return http.patch('/item/liked', user_liked_item);
};

const updateUserLikedItem = (update_user_liked_item) => {
  return http.patch('/item/update', update_user_liked_item);
};

const userDislikedItem = (dislikedItem) => {
  return http.patch('/item/disliked', dislikedItem);
};

const deleteItem = (itemid) => {
  return http.delete('/item', { params: { itemid } });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createUser,
  getAllUsers,
  addItem,
  getAllItems,
  getLikedItemsByUser,
  userLikedItem,
  updateUserLikedItem,
  userDislikedItem,
  getItemsByUser,
  deleteItem,
};
