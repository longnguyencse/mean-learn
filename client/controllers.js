exports.RegisterAccountController = function($scope, $http) {
  $scope.register = function(user) {
    $scope.user = angular.copy(user);
    $http.
      post('/api/v1/account', $scope.user).
      success(function(data) {
        alert("success!!!");
      });
  };

  setTimeout(function() {
    $scope.$emit('RegisterAccountController');
  }, 0);
};

exports.AddBrandController = function($scope, $http, $user, $timeout) {
  $scope.addBrand = function(brand) {

    $scope.brand = angular.copy(brand);
    $user.user.brands.push($scope.brand);

    $http.
      put('/api/v1/me/brand', { brands: $user.user.brands }).
      success(function(data) {
        $user.loadUser();
        $scope.success = true;
        alert('success!!!');

        $timeout(function() {
          $scope.success = false;
        }, 5000);
      });
  };

  setTimeout(function() {
    $scope.$emit('AddBrandController');
  }, 0);
};

exports.AddProductController = function($scope, $http) {
  $scope.addProduct = function(product) {
    $scope.product = angular.copy(product);
    $http.
      post('/api/v1/product', $scope.product).
      success(function(data) {
        alert("success!!!");
      });
  };

  setTimeout(function() {
    $scope.$emit('AddProductController');
  }, 0);
};

exports.HomeController = function($scope, $http) {
  $scope.load = function() {
    $http.
      get('/api/v1/product').
      success(function(data) {
        $scope.products = data.products;
      });
  };

  $scope.load();

  setTimeout(function() {
    $scope.$emit('HomeController');
  }, 0);
};

exports.BrandController = function($scope, $user, $http) {
  $scope.load = function() {
    $http.
      get('/api/v1/brand').
      success(function(data) {
        $scope.brands = data.brands;
      });
  };

  $scope.load();

  $scope.addBrand = function(brand) {
    $scope.brand = angular.copy(brand);
    $scope.brand.account = $user.user._id;

    $http.
      post('/api/v1/brand', $scope.brand ).
      success(function(data) {
        alert('success!!!');
      });
  };

  setTimeout(function() {
    $scope.$emit('BrandController');
  }, 0);
};

exports.BrandDetailsController = function($scope, $user, $http, $routeParams) {
  $scope.load = function() {
    var encoded = encodeURIComponent($routeParams.id);
    $http.
      get('/api/v1/brand/id/' + encoded).
      success(function(data) {
        $scope.brand = data.brand;
      });
  };

  $scope.load();

  $scope.addProduct = function(product) {
    $scope.product = angular.copy(product);
    $scope.product.account = $user.user._id;
    $scope.product.brand = $scope.brand._id;
    $http.
      post('/api/v1/product', $scope.product).
      success(function(data) {
        alert("success!!!");
      });
  };

  setTimeout(function() {
    $scope.$emit('BrandDetailsController');
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
