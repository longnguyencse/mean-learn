var mongoose = require('mongoose');
var AccountSocial = require('./account_social');
var AccountSetting = require('./account_setting');
var Brand = require('./brand');

var account = {
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
  },
  account_setting: AccountSetting.accountSetting,
  account_social: AccountSocial.accountSocial
};

module.exports = new mongoose.Schema(account);
module.exports.account = account;
