module.exports = (request, response, next) => {
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
