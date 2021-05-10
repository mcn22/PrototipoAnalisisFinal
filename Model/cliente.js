const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const CustomerSchema = new mongoose.Schema({
  Id:Integer,
  Name: String
}, {timestamps: true});

var Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
