var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for shop
var UserSchema =  new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    },
  email: {
      type: String,
      unique: true
      required: true,
    },
  password: {
    type: String,
    required: true,
    }
});

UserSchema.method('validPassword', function(password, callback) {

    if (password == this.password) {
      return true;
    } else {
      return false;
    }
});

module.exports = mongoose.model('users', UserSchema);