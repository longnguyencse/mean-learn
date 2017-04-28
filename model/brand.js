var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {
    type: String
  },
  logo_url: {
    type: String
  },
  establisted: {
    type: String
  },
  create_time: {
    type: String
  },
  update_time: {
    type: String
  },
  brand_address: {
    type: String
  },
  post_code: {
    type: String
  },
  fax: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  country: {
    type: String
  },
  country_code: {
    type: String
  },
  blog_link: {
    type: String
  },
  facebook_link: {
    type: String
  },
  twitter_link: {
    type: String
  },
  g_lat: {
    type: String
  },
  g_long: {
    type: String
  },
  brand_name: {
    type: String
  }
})
