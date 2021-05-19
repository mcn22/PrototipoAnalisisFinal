const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const passport = require('passport');

const Customer = require(__dirname + "/../Model/cliente.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

router.get("/", (req, res, next) => {
    res.status(200).render("login");
});

router.post("/", (req,res,next) => {

  const user = new Customer({
    username:req.body.username,
    password:req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.redirect("/login");
    }else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("home");
      });
    }
  })
})

module.exports = router;
