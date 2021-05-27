const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const Middlewares = require('./src/middlewares/middlewares');
const Configurations = require('./configurations/configurations');
const AuthRoutes = require('./src/routes/auth.route');
const UserRoutes = require('./src/routes/user.route');
const ItemRoutes = require('./src/routes/item.route');
const keys = require('./configurations/keys');
require('./src/services/passport'); //does not work without this line

//mongoose.connect ligger i Configurations.js

const app = express(); //wrappar hela applikationen, kan även heta application eller server
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
  const path = require('path');

  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(Middlewares.notFound); //det sista som körs om den inte hittar någon matchning
app.use(Middlewares.errorHandler);

Configurations.connectToDatabase();
Configurations.connectToPort(app);
