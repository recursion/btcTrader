let App = {};

App.controller = function(){
  App.vm.init();
};

App.vm = (function() {
  var vm = {}
  vm.init = function() {

  }
  return vm
}())

App.view = function(){
  return [
    m.component(Orderbook),
    m.component(Product),
    m.component(Trade)
  ];
};
