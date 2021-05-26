const StatusCode = require('../../configurations/statusCode');

const { NODE_ENV } = process.env;

const notFound = (request, response, next) => {
  const error = new Error('invalid URL = NOT FOUND');
  response.status(StatusCode.NOT_FOUND);
  next(error); //går vidare om next används
};

const errorHandler = (error, request, response, next) => {
  const statuscode =
    response.statusCode === StatusCode.OK
      ? StatusCode.INTERNAL_SERVER_ERROR
      : response.statusCode;
  response.status(statuscode); // här svarar vi antagligen 500 eller 404
  response.json({
    statuscode: statuscode,
    message: error.message, //talar om vad som gick fel
    stackTrace: NODE_ENV === 'production' ? null : error.stack, //visar endast stacktrace när vi är i developmentmode
  });
};

const requireLogin = (request, response, next) => {
  //we call next when all is done/complete, so we can go to the next middleware in the chain
  if (!request.user) {
    return response.status(401).send({ error: 'You must log in!' });
  }
  next();
};

/* I filen där vi vill använda denna begränsning, requiera in filen 
 Lägg sedan till requireLogin som ett andra argiment  efter tex '/api/stripe' och före async (request, response)
 tex i en postrequest
 obs ej med () även om det är en funktion, vill bara ha en referense till vår funktion
*/

module.exports = {
  notFound,
  errorHandler,
  requireLogin,
};
