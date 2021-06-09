const StatusCode = require('../../configurations/statusCode');

const { NODE_ENV } = process.env;

const notFound = (request, response, next) => {
  const error = new Error('invalid URL = NOT FOUND');
  response.status(StatusCode.NOT_FOUND);
  next(error);
};

const errorHandler = (error, request, response, next) => {
  const statuscode =
    response.statusCode === StatusCode.OK
      ? StatusCode.INTERNAL_SERVER_ERROR
      : response.statusCode;
  response.status(statuscode);
  response.json({
    statuscode: statuscode,
    message: error.message,
    stackTrace: NODE_ENV === 'production' ? null : error.stack,
  });
};

const requireLogin = (request, response, next) => {
  if (!request.user) {
    return response.status(401).send({ error: 'You must log in!' });
  }
  next();
};

module.exports = {
  notFound,
  errorHandler,
  requireLogin,
};
