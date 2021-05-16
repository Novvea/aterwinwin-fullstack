const passport = require('passport');

const routes = (application) => {
  application.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'], //what access we want to have from google
      prompt: 'select_account',
    })
  );

  application.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (request, response) => {
      response.redirect('/om');
    }
  );

  application.get('/api/logout', (request, response) => {
    request.logout();
    response.send(request.user);
  });

  application.get('/api/current_user', (request, response) => {
    response.send(request.user);
  });
};

module.exports = { routes };
