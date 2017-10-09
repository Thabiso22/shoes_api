const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoe_apiD_Base";
console.log(mongoURL);
mongoose.connect(mongoURL,function(err, result) {
  if (err) {
    console.log(err);
  }else {
    console.log("Connected to shoe_api.");
  }
});


var UserSchema = mongoose.Schema({
      colour:String,
      size :Number,
      brand:String,
      price:Number,
      in_stock:Number
   });



var user = mongoose.model('shoe_apiD_Base', UserSchema);
module.exports = user;
