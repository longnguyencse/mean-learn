var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/app');

  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + 'mongodb://127.0.0.1:27017/app');
  });

  // If the connection throws an error
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });


  var Account = mongoose.model('Account', require('./account.js'), 'accounts');
  var Brand = mongoose.model('Brand', require('./brand.js'), 'brands');
  var Product = mongoose.model('Product', require('./product'), 'products');

  new Account({_id:1}).save(function(err) {
    if(err) console.log(err);
  });
  new Brand({_id:1}).save(function(err) {
    if(err) console.log(err);
  });
  new Product({_id:1}).save(function(err) {
    if(err) console.log(err);
  });

  var models = {
    Account: Account,
    Brand: Brand,
    Product: Product
  };

  //console.log(Account,Brand,Product);

  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
}
