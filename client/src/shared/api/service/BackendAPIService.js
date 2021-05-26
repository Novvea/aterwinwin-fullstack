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

const getMyItemsFromServer = (email) => {
  return http.get('/items/myuploads', { params: { email } });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createUser,
  getAllUsers,
  addItem,
  getAllItems,
  userLikedItem,
  userDislikedItem,
  getMyItemsFromServer,
};
