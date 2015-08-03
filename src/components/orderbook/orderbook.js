const CB_API= 'https://api.exchange.coinbase.com';

let Order = {};

Order.model = function(){
  this.price = m.prop('');
  this.size = m.prop('');
  this.numOrders = m.prop(0);
};

let Orderbook = {};

Orderbook.model = function(data){
  this.asks = m.prop(data.asks);
  this.bids = m.prop(data.bids);
};

Orderbook.load = function(){
  return m.request({method: 'GET', url: CB_API + '/products/BTC-USD/book?level=2'})
    .then(function(book){
      console.log(book);
      return new Orderbook.model(book);
    });
};

Orderbook.controller = function(){
  Orderbook.vm.init();
};

// view-model
Orderbook.vm = (function() {

  var vm = {};

  vm.init = function(){
    vm.orderbook = Orderbook.load();
  }

  return vm;

}());

Orderbook.view = function(){
  return m('.orderbookContainer', [
    m('.orderbook', [
      Orderbook.vm.orderbook.map(function(order){
        m('p', order)
      })
    ])
  ]);
};


