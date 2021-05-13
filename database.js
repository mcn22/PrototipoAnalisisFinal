const mongoose = require('mongoose');

class Database {

  constructor(){
      this.connect();
  }

  connect(){
    mongoose.connect('mongodb://localhost:27017/Energym', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Succesfully connected to the database");
    })
    .catch((err) => {
      console.log("The error is "+err);
    });
  }
}

module.exports = new Database();
