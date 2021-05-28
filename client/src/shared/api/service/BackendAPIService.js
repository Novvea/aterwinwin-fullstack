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

const getAllItems = () => {
  return http.get('/item');
};

const userLikedItem = (likedItem) => {
  return http.patch('/item/liked', likedItem);
};

const userDislikedItem = (likedItem) => {
  return http.patch('/item/liked', likedItem);
};

const getItemsByUser = (include_items_by_user) => {
  return http.get('/item', { params: { include_items_by_user } });
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
  userLikedItem,
  userDislikedItem,
  getItemsByUser,
  deleteItem,
};
