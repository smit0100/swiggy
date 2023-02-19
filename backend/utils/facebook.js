const passport = require('passport');
const User = require('../module/UserModel');
const FacebookStrategy = require("passport-facebook").Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
      try {
          let user = await User.findOne({
            facebookId:profile.id
          })
          console.log(profile);
          if (!user) {
              user = new User({
                // email: profile.emails[0].value,
                facebookId: profile.id,
                facebookAccessToken: accessToken,
                facebookRefreshToken: refreshToken,
                name:profile.displayName
              })

              await user.save()
          }
          cb(null,user)
      } catch (e) {
          cb(e)
    }
  }
));