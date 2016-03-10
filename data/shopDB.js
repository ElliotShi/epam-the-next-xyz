var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for shop
var ShopSchema =  new Schema({
  title: String,
  summary: String,
  image: String,
  author: String,
});

module.exports = mongoose.model('shops', ShopSchema);