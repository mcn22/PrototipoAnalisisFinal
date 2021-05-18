const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
// mongoose.set('useCreateIndex', true);

const CustomerSchema = new mongoose.Schema({
  email:String,
  password:String,
  googleId:String,
  fName:String,
  lName:String,
  // birthDate:Date,
  phone:String,
  province:String,
  postalCode:String,
  address:String
});
// }, {timestamps: true});

CustomerSchema.plugin(passportLocalMongoose);
CustomerSchema.plugin(findOrCreate);

var Customer = mongoose.model("Customer", CustomerSchema);




module.exports = Customer;
