// RENSA BORT DENNA!
const UserModel2 = require('../models/User.model');
const StatusCode = require('../../configurations/statusCode');

const createUser = async (request, response) => {
  const user = new UserModel2({
    email: request.body.email,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    password: request.body.password,
  });
  try {
    const databaseResponse = await user.save();
    response.status(StatusCode.CREATED).send(databaseResponse);
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: 'Errro while trying to create user',
      stack: error,
    });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const databaseResponse = await UserModel2.find();
    response.status(StatusCode.OK).send(databaseResponse);
  } catch (error) {
    response
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const getUserById = async (request, response) => {
  try {
    const userId = request.query.id;
    const databaseResponse = await UserModel2.findById(userId);
    response.status(StatusCode.OK).send(databaseResponse);
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: `Error while trying to get user with ID ${userId}`,
    });
  }
};

const deleteUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    const databaseResponse = await UserModel2.findByIdAndDelete(userId);
    response
      .status(StatusCode.OK)
      .send({ message: 'Successfully deleted urser', data: databaseResponse });
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: `Error while trying to delete user with ID ${userId}`,
    });
  }
};

const updateUser = async (request, response) => {
  const userId = request.params.userId;
  const data = {
    username: request.body.username,
    password: request.body.password,
  };
  try {
    const databaseResponse = await UserModel2.findByIdAndUpdate(userId, data, {
      new: true,
    });
    response.status(StatusCode.OK).send(databaseResponse);
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: `Error while trying to update user with ID ${userId}`,
      error: error.message,
    });
  }
};

const searchUsername = async (request, response) => {
  try {
    const databaseResponse = await UserModel2.find({
      username: request.query.username,
    });
    response.status(StatusCode.OK).send(databaseResponse);
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: `Error occured while trying to retrieve user with username: ${request.query.username}`,
      error: error.message,
    });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  searchUsername,
};
