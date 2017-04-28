var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {
    type: String
  },
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
  }
})
