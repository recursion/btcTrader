var coinbaseAPIURL = 'https://api.exchange.coinbase.com';


var Product = {};

Product.model = function(data){
  this.base_currency = m.prop(data.base_currency);
  this.base_max_size = m.prop(data.base_max_size);
  this.display_name = m.prop(data.display_name);
  this.id = m.prop(data.id);
  this.quote_currency = m.prop(data.quote_currency);
  this.quote_increment = m.prop(data.quote_increment);
};

// keep a collection
Product.list = Array;

Product.controller = function(){
  Product.vm.init();
};

// view-model
Product.vm = (function() {

  var vm = {};

  vm.init = function(){
    vm.list = new Product.list();

    // ask the api for the products
    vm.loadProducts = function(){
      m.request({method: "GET", url: coinbaseAPIURL + '/products'})
        .then(function(products) {
          products.forEach(function(product){
            // push each product onto our list
            vm.list.push(new Product.model(product));
          });
        });
    };
    vm.loadProducts();

    vm.click = function(){
      console.log('Hi Mom!, from: ', this);
    };

  }

  return vm;

}());

Product.view = function(){
  return m('div', [
    Product.vm.list.map(function(product){
      return m('p', {onclick: Product.vm.click}, product.display_name());
    })
  ]);
};

