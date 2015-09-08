require('./components/websocket/socket.js');

import {Orderbook} from "./components/orderbook/orderbook.js";
import {Product} from "./components/products/products.js";
import {Trade} from "./components/trades/trades.js";

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

m.mount(document.body, App)
