require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { uuid } = require("uuidv4");

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const newToken = (user) => {
  return (token = jwt.sign({ user: user }, "ajioproject"));
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://ajioclone.herokuapp.com/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();
      if (user) {
        return done(null, { user });
      }
      if (!user) {
        user = await User.create({
          name: profile?._json?.name,
          email: profile?._json?.email,
          username: profile?._json?.given_name,
          password: "sdaljfsdlf",
          mobile: "default",
        });
      }
      const token = newToken(user);
      return done(null, { user, token });
    }
  )
);

module.exports = passport;
