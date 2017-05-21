var mongoose = require('mongoose');
var Account = require('./account');
var Brand = require('./brand');

module.exports = new mongoose.Schema({
  title: {
    type: String
  },
  product_type: {
    type: String
  },
  price: {
    type: String
  },
  num_view: {
    type: String
  },
  num_like: {
    type: String
  },
  num_bookmark: {
    type: String
  },
  currency: {
    type: String
  },
  photo_url: {
    type: String
  },
  account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand'} 
})
