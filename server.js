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
require('./src/services/passport');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        scriptSrc: ["'self' https: 'unsafe-inline'"],
        defaultSrc: ["'self'", 'https://aterwinwin-fullstack.herokuapp.com:*'],
        connectSrc: [
          "'self'",
          'https://aterwinwin-fullstack.herokuapp.com:*',
          'https://api.cloudinary.com',
        ],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'https://res.cloudinary.com',
          '*.googleusercontent.com',
        ],
      },
    },
  })
);
app.use(morgan('common'));

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

app.use(Middlewares.notFound);
app.use(Middlewares.errorHandler);

Configurations.connectToDatabase();
Configurations.connectToPort(app);
