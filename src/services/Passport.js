import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20' //osäker på var jag ska placera .Strategy
import keys from '../../configurations/keys.js'

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => { //now we can use this to save our user to the database
    console.log('accessToken: ', accessToken)
    console.log('refreshToken: ', refreshToken)
    console.log('profile: ', profile)
  })
)