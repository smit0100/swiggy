const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../module/UserModel');

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope:['profile','email']
    },
        async function  (accessToken, refreshToken, profile, callback) {
            // callback(null,profile)
            
            
            try {
                let user = await User.findOne({ googleId: profile.id })
                console.log(user);
                console.log("its run");
                if (!user) {
                    console.log("why its run");
                     user = new User({
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        googleAccessToken: accessToken,
                         googleRefreshToken: refreshToken,
                        name:profile.displayName
                     })
                    await user.save();
                }

                 callback(null,user)
            }catch (e) {
                callback(e)
            }
            


            
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null,user)
})

module.exports = passport