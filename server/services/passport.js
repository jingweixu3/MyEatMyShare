const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const mongoose = require('mongoose');
const keys = require('../config/keys');
const { insertUser, getUser } = require('../firebase/models/User');

// const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    //null是error message，为什么不用google.id是因为会有很多provider
    console.log("serialize", user.googleId);
    done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
    getUser(googleId). then(user => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy(
        {
            clientID:keys.googleClientID,
            clientSecret:keys.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => { 
            // console.log('accessToken', accessToken);
            // console.log('refreshToken', refreshToken);
            // console.log('profile.id', profile.id);
            // console.log("emiallll", profile.emails[0].value);
            const existingUser = await getUser(profile.id);
            console.log("existing userrrr",existingUser);

            if (existingUser != null){
                console.log("user is:", existingUser);
                return done(null, existingUser);
            }
            const user = await insertUser(profile);
            console.log("insert userrrrr", user);
            // const user = await new User({
            //     googleId: profile.id,
            //     firstName: profile.givenName,
            //     lastName: profile.familyName,
            //     email: profile.emails[0].value,
            //     friends:[]
            //     // blogs:[]
            // })
            //     .save();
            done(null, user);    
        }

        
    )
);
