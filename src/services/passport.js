const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../../configurations/keys');

const AuthUser = mongoose.model('authuser');

passport.serializeUser((authuser, done) => {
  done(null, authuser.id);
});

passport.deserializeUser((id, done) => {
  AuthUser.findById(id).then((authuser) => {
    done(null, authuser);
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
      const authuser = await AuthUser.findOneAndUpdate(
        { googleId: profile.id },
        {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      done(null, authuser);
    }
  )
);
