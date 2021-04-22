import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20' //osäker på var jag ska placera .Strategy
import mongoose from 'mongoose'
import keys from '../../configurations/keys.js'

const User = mongoose.model('users')

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => { //now we can use this to save our user to the database
    new User({ googleId: profile.id })
  })
)