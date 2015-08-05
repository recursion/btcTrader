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
  // TODO: change to level 3, build a model to sort the full orderbook locally
  return m.request({method: 'GET', url: CB_API + '/products/BTC-USD/book?level=3'})
    .then(function(book){
      return new Orderbook.model(book);
    });
};

Orderbook.controller = function(){
  Orderbook.vm.init();
};

// view-model
Orderbook.vm = (function() {

  var vm = {};

  vm.orderbook = {};
  vm.orderbook.asks = m.prop([]);
  vm.orderbook.bids = m.prop([]);

  vm.init = function(){

    Orderbook.load()
      .then(function(orderbook){
        vm.orderbook.asks = orderbook.asks;
        vm.orderbook.bids = orderbook.bids;
        m.redraw();
      });
  }

  return vm;

}());

Orderbook.view = function(){
  return m('.orderbook', [
    m('table', [
      Orderbook.vm.orderbook.asks().slice(0, 10).reverse().map(function(order){
        return [
          m('tr', [
            m('td', order[1]),
            m('td', {className: 'ask'}, order[0])
          ])
        ]
      })
    ]),
    m('br'),
    m('table', [
      Orderbook.vm.orderbook.bids().slice(0, 10).map(function(order){
        return [
          m('tr', [
            m('td', order[1]),
            m('td', {className: 'bid'}, order[0])
          ])
        ]
      })
    ])
  ]);
};


