var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var components = angular.module('mean-retail.components', ['ng']);

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

_.each(services, function(factory, name) {
  components.factory(name, factory);
});

var app = angular.module('mean-retail', ['mean-retail.components', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
    when("/register", {
        templateUrl : "/client/templates/register_account.html",
        controller: 'RegisterAccountController'
    })
    .when("/add-brand", {
        templateUrl : "/client/templates/add_brand.html",
        controller: 'AddBrandController'
    })
    .when("/add-product", {
        templateUrl : "/client/templates/add_product.html",
        controller: "AddProductController"
    })
    .when('/brand/:id', {
      templateUrl: '/client/templates/category_view.html'
    })
    .when('/product/:id', {
      template: '<product-details></product-details>'
    });
    

});
