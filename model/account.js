var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  nationality: {
    type: String,
  },
  language: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  avatar_url: {
    type: String,
  }
});
