import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20' //osäker på var jag ska placera .Strategy
import mongoose from 'mongoose'
import keys from '../../configurations/keys.js'

const User = mongoose.model('users') //user-class declaration

passport.serializeUser((user, done) => {
  done(null, user.id) //id created by mongodb, not the profile-id
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => { //now we can use this to save our user to the database
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user))
        }
      })
  }
  )
)