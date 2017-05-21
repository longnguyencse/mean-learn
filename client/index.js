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
    when("/signup", {
        templateUrl : "/client/templates/signup.html",
        controller: 'RegisterAccountController'
    })
    .when("/login", {
        templateUrl : "/client/templates/login.html",
        controller: 'RegisterAccountController'
    })
    .when("/", {
        templateUrl : "/client/templates/home.html",
        controller: 'HomeController'
    })
    .when("/brand", {
        templateUrl : "/client/templates/brand.html",
        controller: 'BrandController'
    })
    .when("/product", {
        templateUrl : "/client/templates/product.html",
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
      templateUrl: '/client/templates/brand_detail.html',
      controller: "BrandDetailsController"
    })
    .when('/product/:id', {
      template: '<product-details></product-details>'
    });


});
