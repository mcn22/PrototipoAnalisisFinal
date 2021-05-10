const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

//Routes

const loginRoute = require("./Controller/loginRoute");

app.use("/login", loginRoute);

app.get("/", middleware.requireLogin, function(req, res, next){
  res.status(200).render("home");
});

app.get("/home", function(req, res, next){
  res.status(200).render("home");
});


app.listen(process.env.PORT ||"3000", function(req,res){
  console.log("Listening to port 3000")
});
