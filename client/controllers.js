exports.RegisterAccountController = function($scope, $http) {
  $scope.user = {
    "email": "ttvicse@gmail.com",
    "name": "Tran Trung Vi",
    "password": "123456",
    "phone": "+841634331483",
    "nationality": "Viet Nam",
    "language": "vietnamese",
    "birthday": "15/12/1993",
    "gender": "male",
    "avatar_url": "",
    "account_setting": "",
    "account_social": "",
    "brands": ""
  };
  $scope.register_success = false;
  $scope.register = function(user) {
    $scope.user = angular.copy(user);
    $http.
      post('/api/v1/account', $scope.user).
      success(function(data) {
        $scope.register_success = true;
      });
  };
  $scope.reset = function() {
    $scope.user = {};
  };

  setTimeout(function() {
    $scope.$emit('RegisterAccountController');
  }, 0);
};

exports.AddBrandController = function($scope, $http) {
  $scope.brand = {
    "logo_url": "https://www.facebook.com/386704544749110/photos/386705071415724/",
    "establisted": "5/5/2017",
    "create_time": "5/5/2017",
    "update_time": "5/5/2017",
    "brand_address": "HCM, Viet Nam",
    "post_code": "70000",
    "fax": "+841634331483",
    "phone": "+841634331483",
    "email": "ttvicse@gmail.com",
    "country": "Viet Name",
    "country_code": "84",
    "blog_link": "https://www.facebook.com/ToiLaIT/?hc_ref=PAGES_TIMELINE&fref=nf",
    "facebook_link": "https://www.facebook.com/ToiLaIT/?hc_ref=PAGES_TIMELINE&fref=nf",
    "twitter_link": "https://www.facebook.com/ToiLaIT/?hc_ref=PAGES_TIMELINE&fref=nf",
    "g_lat": "12",
    "g_long": "12",
    "brand_name": "Toi la dan IT"
  };
  $scope.done = false;
  $scope.addBrand = function(brand) {
    $scope.brand = angular.copy(brand);
    $http.
      post('/api/v1/brand', $scope.brand).
      success(function(data) {
        $scope.done = true;
      });
  };
  $scope.reset = function() {
    $scope.brand = {};
  };

  setTimeout(function() {
    $scope.$emit('AddBrandController');
  }, 0);
};

exports.AddProductController = function($scope, $http) {
  $scope.product = {
    "title": "Angularjs Book",
    "product_type": "book",
    "price": "99$",
    "num_view": "123",
    "num_like": "123",
    "num_bookmark": "123",
    "currency": "0.5",
    "photo_url": "https://images-na.ssl-images-amazon.com/images/I/51rlLtBTWPL._SX379_BO1,204,203,200_.jpg",
    "account": "ttvicse@gmail.com",
    "brand": "Toi la dan IT"
  };
  $scope.done = false;
  $scope.addProduct = function(product) {
    $scope.product = angular.copy(product);
    $http.
      post('/api/v1/product', $scope.product).
      success(function(data) {
        $scope.done = true;
      });
  };
  $scope.reset = function() {
    $scope.product = {};
  };

  setTimeout(function() {
    $scope.$emit('AddProductController');
  }, 0);
};

exports.AddToCartController = function($scope, $http, $user, $timeout) {
  $scope.addToCart = function(product) {
    var obj = { product: product._id, quantity: 1 };
    $user.user.data.cart.push(obj);

    $http.
      put('/api/v1/me/cart', { data: { cart: $user.user.data.cart } }).
      success(function(data) {
        $user.loadUser();
        $scope.success = true;

        $timeout(function() {
          $scope.success = false;
        }, 5000);
      });
  };
};

exports.CategoryProductsController = function($scope, $routeParams, $http) {
  var encoded = encodeURIComponent($routeParams.category);

  $scope.price = undefined;

  $scope.handlePriceClick = function() {
    if ($scope.price === undefined) {
      $scope.price = -1;
    } else {
      $scope.price = 0 - $scope.price;
    }
    $scope.load();
  };

  $scope.load = function() {
    var queryParams = { price: $scope.price };
    $http.
      get('/api/v1/product/category/' + encoded, { params: queryParams }).
      success(function(data) {
        $scope.products = data.products;
      });
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('CategoryProductsController');
  }, 0);
};

exports.CategoryTreeController = function($scope, $routeParams, $http) {
  var encoded = encodeURIComponent($routeParams.category);
  $http.
    get('/api/v1/category/id/' + encoded).
    success(function(data) {
      $scope.category = data.category;
      $http.
        get('/api/v1/category/parent/' + encoded).
        success(function(data) {
          $scope.children = data.categories;
        });
    });

  setTimeout(function() {
    $scope.$emit('CategoryTreeController');
  }, 0);
};

exports.CheckoutController = function($scope, $user, $http) {
  // For update cart
  $scope.user = $user;

  $scope.updateCart = function() {
    $http.
      put('/api/v1/me/cart', $user.user).
      success(function(data) {
        $scope.updated = true;
      });
  };

  // For checkout
  Stripe.setPublishableKey('pk_test_KVC0AphhVxm52zdsM4WoBstU');

  $scope.stripeToken = {
    number: '4242424242424242',
    cvc: '123',
    exp_month: '12',
    exp_year: '2016'
  };

  $scope.checkout = function() {
    $scope.error = null;
    Stripe.card.createToken($scope.stripeToken, function(status, response) {
      if (status.error) {
        $scope.error = status.error;
        return;
      }

      $http.
        post('/api/v1/checkout', { stripeToken: response.id }).
        success(function(data) {
          $scope.checkedOut = true;
          $user.user.data.cart = [];
        });
    });
  };
};

exports.NavBarController = function($scope, $user) {
  $scope.user = $user;

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};

exports.ProductDetailsController = function($scope, $routeParams, $http) {
  var encoded = encodeURIComponent($routeParams.id);

  $http.
    get('/api/v1/product/id/' + encoded).
    success(function(data) {
      $scope.product = data.product;
    });

  setTimeout(function() {
    $scope.$emit('ProductDetailsController');
  }, 0);
};
