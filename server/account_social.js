var mongoose = require('mongoose');

var accountSocial = {
  social_type: {
    type: String,
  },
  token: {
    type: String,
  },
  expire_time: {
    type: String,
  },
  social_name: {
    type: String,
  },
  social_birthday: {
    type: String,
  },
  social_email: {
    type: String,
  },
  social_phone: {
    type: String,
  }
};

module.exports = new mongoose.Schema(accountSocial);
module.exports.accountSocial = accountSocial;
