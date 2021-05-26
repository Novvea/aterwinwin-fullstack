const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../../configurations/keys');

const AuthUser = mongoose.model('authuser'); //user-class declaration

passport.serializeUser((user, done) => {
  done(null, user.id); //id created by mongodb, not the profile-id
});

passport.deserializeUser((id, done) => {
  AuthUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      //now we can use this to save our user to the database
      const existingUser = await AuthUser.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const authuser = await new AuthUser({ googleId: profile.id }).save();
      done(null, authuser);
    }
  )
);
