const passport = require('passport');

const routes = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (request, response) => {
      response.redirect('/');
    }
  );

  app.get('/api/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });

  app.get('/api/current_user', (request, response) => {
    response.send(request.user);
  });
};

module.exports = { routes };
