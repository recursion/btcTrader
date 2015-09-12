const CB_API= 'https://api.exchange.coinbase.com';

let Order = {};

setTimeout(function(){
  console.log(CoinbaseSyncedOrderbook.book.state());
}, 3000);

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
  //Orderbook.vm.init();
};

// view-model
Orderbook.vm = (function() {

  var vm = {};

  vm.orderbook = CoinbaseSyncedOrderbook;

  //vm.orderbook.asks = m.prop([]);
  //vm.orderbook.bids = m.prop([]);

  /*
  vm.init = function(){

    Orderbook.load()
      .then(function(orderbook){
        vm.orderbook.asks = orderbook.asks;
        vm.orderbook.bids = orderbook.bids;
        m.redraw();
      });
  };
  */

  return vm;

}());

// build price data from the coinbase orderbook objects
// price is an object with 2 properties
// _price which is an array
// and precision which is a number indicating where the decimal goes in the price
// we need to take these two properties and return the actual price from it
Orderbook.formatPrice = function(priceObject){
  // iterate through the price array and construct a number
  // use the precision property to place the decimal.
  //
  var price = '';
  priceObject.price._int._d.forEach(function(x){
    price += x;
  });
  // add the decimal point
  var len = priceObject.price._int._d.length;
  var decimalPlace = len - priceObject.price._precision;

  price = price.split('');
  price.splice(decimalPlace, 0, '.');
  price = price.join('');

  // add padding (239.5 should be 239.50)

  return price;
};

Orderbook.countSize = function(order){
  var total = '';
  order.size._int._d.forEach(function(x){
    total += x;
  });
  var len = order.size._int._d.length;
  var decimalPlace = len - order.size._precision;

  total = total.split('');
  total.splice(decimalPlace, 0, '.');
  total = total.join('');

  return total;
};

// cheap hack to fill in for my lack of mithril talent.
// we should actually be updating the view to change when the data itself does
setInterval(function(){
  m.redraw();
}, 1000);

Orderbook.view = function(){
  return m('.orderbook', [
    m('table', [
      Orderbook.vm.orderbook.book.state().asks.slice(0, 10).reverse().map(function(order){
        return [
          m('tr', [
            // call a function to determine price here
            m('td', Orderbook.countSize(order)),
            m('td', Orderbook.formatPrice(order))
          ])
        ]
      })
    ]),
    m('br'),
    m('table', [
      Orderbook.vm.orderbook.book.state().bids.slice(0, 10).map(function(order){
        return [
          m('tr', [
            m('td', Orderbook.countSize(order)),
            m('td', Orderbook.formatPrice(order))
          ])
        ]
      })
    ])
  ]);
};

export default {Orderbook};
