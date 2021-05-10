const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

router.get("/", (req, res, next) => {
    res.status(200).render("login");
});

module.exports = router;
