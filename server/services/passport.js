const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const mongoose = require('mongoose');
const keys = require("../config/keys");
const { insertUser, getUserByGoogleId } = require("../firebase/models/User");
passport.serializeUser((user, done) => {
  console.log("serialize", user.googleId);
  done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
  getUserByGoogleId(googleId).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await getUserByGoogleId(profile.id);
      if (existingUser != null) {
        return done(null, existingUser);
      }
      const user = await insertUser(profile);
      done(null, user);
    }
  )
);
