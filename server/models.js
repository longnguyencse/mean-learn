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

  var AccountSetting = mongoose.model('AccountSetting', require('./account_setting'), 'account_settings');
  var AccountSocial = mongoose.model('AccountSocial', require('./account_social'), 'account_socials');
  var Account = mongoose.model('Account', require('./account'), 'accounts');
  var Brand = mongoose.model('Brand', require('./brand'), 'brands');
  var Product = mongoose.model('Product', require('./product'), 'products');
  var Notification = mongoose.model('Notification', require('./notification'), 'notifications');

  // for(var i=0; i<100; i++) {
  //   new AccountSetting({}).save(function(err) {
  //     if(err) console.log(err);
  //   })
  //   new AccountSocial({}).save(function(err) {
  //     if(err) console.log(err);
  //   })
  //   new Account({}).save(function(err) {
  //     if(err) console.log(err);
  //   });
  //   new Brand({}).save(function(err) {
  //     if(err) console.log(err);
  //   });
  //   new Product({}).save(function(err) {
  //     if(err) console.log(err);
  //   });
  //   new Notification({}).save(function(err) {
  //     if(err) console.log(err);
  //   })
  // }

  var models = {
    AccountSocial: AccountSocial,
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
