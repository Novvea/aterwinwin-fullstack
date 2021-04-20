import passport from 'passport'

const routes = (application) => {
  application.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //what access we want to have from google
    })
  )

  application.get('/auth/google/callback', passport.authenticate('google'))
}

export default { routes }
