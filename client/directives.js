exports.registerAccount = function() {
  return {
    controller: 'RegisterAccountController',
    templateUrl: '/client/templates/register_account.html'
  };
};

exports.addBrand = function() {
  return {
    controller: 'AddBrandController',
    templateUrl: '/client/templates/add_brand.html'
  };
};

exports.addProduct = function() {
  return {
    controller: 'AddProductController',
    templateUrl: '/client/templates/add_product.html'
  };
};

exports.addToCart = function() {
  return {
    controller: 'AddToCartController',
    templateUrl: '/client/templates/add_to_cart.html'
  };
};

exports.categoryProducts = function() {
  return {
    controller: 'CategoryProductsController',
    templateUrl: '/client/templates/category_products.html'
  }
};

exports.categoryTree = function() {
  return {
    controller: 'CategoryTreeController',
    templateUrl: '/client/templates/category_tree.html'
  }
};

exports.checkout = function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/client/templates/checkout.html'
  };
};

exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/client/templates/nav_bar.html'
  };
};

exports.productDetails = function() {
  return {
    controller: 'ProductDetailsController',
    templateUrl: '/client/templates/product_details.html'
  };
};
