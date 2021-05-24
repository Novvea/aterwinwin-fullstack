const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const Middlewares = require('./src/middlewares/Middlewares');
const Configurations = require('./configurations/Configurations');
const AuthRoutes = require('./src/routes/Auth.route');
const UserRoutes = require('./src/routes/User.route');
const ItemRoutes = require('./src/routes/Item.route');
const keys = require('./configurations/keys');
require('./src/services/Passport'); //does not work without this line

//mongoose.connect ligger i Configurations.js

const app = express(); //wrappar hela applikationen, kan även heta app eller server
app.use(express.json()); //istället för body-Parser
app.use(cors({ credentials: true }));
app.use(helmet()); //döljer viss data
app.use(morgan('common')); //ger oss info hur och vem som gjort anropet

//app.use(bodyParser.json()); //lades till vid betalningsavsnittet
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //=30 days
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

AuthRoutes.routes(app);
UserRoutes.routes(app);
ItemRoutes.routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(Middlewares.notFound); //det sista som körs om den inte hittar någon matchning
app.use(Middlewares.errorHandler);

Configurations.connectToDatabase();
Configurations.connectToPort(app);

//export default app
