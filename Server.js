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

const application = express(); //wrappar hela applikationen, kan även heta app eller server
application.use(express.json()); //istället för body-Parser
application.use(cors({ credentials: true }));
application.use(helmet()); //döljer viss data
application.use(morgan('common')); //ger oss info hur och vem som gjort anropet

//application.use(bodyParser.json()); //lades till vid betalningsavsnittet
application.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //=30 days
    keys: [keys.cookieKey],
  })
);
application.use(passport.initialize());
application.use(passport.session());

AuthRoutes.routes(application);
UserRoutes.routes(application);
ItemRoutes.routes(application);
application.use(Middlewares.notFound); //det sista som körs om den inte hittar någon matchning
application.use(Middlewares.errorHandler);

Configurations.connectToDatabase();
Configurations.connectToPort(application);

//export default application
