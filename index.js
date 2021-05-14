require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
const mongoose = require('./database');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require(__dirname + "/Model/cliente.js");


const app = express();



app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home"
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//Routes

const loginRoute = require("./Controller/loginRoute");
const registerRoute = require("./Controller/registerRoute");

app.use("/login", loginRoute);
app.use("/register", registerRoute);

//URL Directions

app.get("/", middleware.requireLogin, function(req, res, next){
  res.status(200).render("home");
});

app.get("/auth/google",
  passport.authenticate("google", {scope:['profile']}));

app.get("/auth/google/home", passport.authenticate("google", {failureRedirect:"/login"}),function(req,res){
  res.redirect("/home");
})

app.get("/home", middleware.requireLogin, function(req, res, next){
  res.status(200).render("home");
});


app.listen(process.env.PORT ||"3000", function(req,res){
  console.log("Listening to port 3000")
});
