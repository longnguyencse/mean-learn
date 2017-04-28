var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.get('/account', wagner.invoke(function(Account) {
    return function(req,res) {
      Account.
        find()
        .sort()
        .limit(10).
        exec(handleMany.bind(null, 'accounts', res));
    }
  }));

  api.get('/brand', wagner.invoke(function(Brand) {
    return function(req,res) {
      Brand.
        find()
        .sort()
        .limit(10).
        exec(handleMany.bind(null, 'brands', res));
    }
  }));

  api.get('/product', wagner.invoke(function(Product) {
    return function(req,res) {
      Product.
        find()
        .sort()
        .limit(10).
        exec(handleMany.bind(null, 'products', res));
    };
  }));

  api.get('/me', function(req, res) {
    if(!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({error: 'Not logged in'});
    }
  });

  return api;
};

function handleMany(property, res, error, result) {
  if (error) {
    console.log(error);
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  console.log(result);

  var json = {};
  json[property] = result;
  res.json(json);
}
