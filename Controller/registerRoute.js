const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const Customer = require(__dirname + "/../Model/cliente.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
});

router.post("/", (req,res,next) => {

  var newCustomer = new Customer({
    username:req.body.username,
    email:req.body.username,
    fName:req.body.fName,
    lName:req.body.lName,
    phone:req.body.phone,
    province:req.body.province,
    postalCode:req.body.postalCode,
    address:req.body.address
  });

  Customer.register(newCustomer, req.body.password, function(err,user){

    if (err) {
      console.log(err); //Add this to the log error process
      return res.render("register");
    }else{
      console.log("entre a autenticar passport");
      passport.authenticate("local")(req,res,function(){
        res.redirect("home");
      });
    }
    // go to the next middleware
    // next();

  });

});
// }, passport.authenticate('local', {
//
//                  successRedirect: '/home',
//                  failureRedirect: '/login'
//   }));



  module.exports = router;
