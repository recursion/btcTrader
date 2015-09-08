const CB_API= 'https://api.exchange.coinbase.com';

let Trade = {};

Trade.model = function(data){
  this.trade = m.prop(data);
  this.tick = m.prop('none');
};

// return a ticker
Trade.list = function(){
  return m.request({method: "GET", url: CB_API + "/products/BTC-USD/trades"})
    .then(function(trades){
      return trades;
    });
};


Trade.controller = function(){
  Trade.vm.init();
};


// view-model
Trade.vm = (function() {

  var vm = {};

  // track the last trade
  vm.lastTrade = 0;

  vm.init = function(){

    vm.list = m.prop([]);

    // load our list of trades
    Trade.list()
      .then(function(trades){

        // reverse the list and add each trade to our trade list
        trades.reverse().forEach(function(trade){

          // format price and size
          trade.price = Number(trade.price).toFixed(2);
          trade.size = +trade.size

          vm.add(trade);

        });
      });

    vm.add = function(trade){

      // get this trade, set the tick (compared to last)
      var t = new Trade.model(trade);
      if (trade.price > vm.lastTrade.price) {
        t.tick = 'uptick';
      } else if (trade.price < vm.lastTrade.price) {
        t.tick = 'downtick';
      } else {
        t.tick = 'unchtick';
      }
      // add the trade to our list
      vm.list().unshift(t);

      // set last trade tot this one
      vm.lastTrade = trade;

      m.redraw();
    };

    // listen for match events (from websockets)
    window.addEventListener('match', function(data){
      vm.add(data.detail);
    });
  }

  return vm;

}());

Trade.view = function(){
  return m('.trades', [
    m('h3', 'Trades'),
    m('table.trade', [
      Trade.vm.list().map(function(trade){
        return m('tr', {className: trade.tick}, [
          m('td', [
            m('span', trade.trade().size),
          ]),
          m('td', {className: 'small'}, [
            m('span', ' @ '),
          ]),
          m('td', [
            m('span', trade.trade().price)
          ]),
          m('td', [
            m('span', new Date(trade.trade().time).toLocaleTimeString())
          ])

        ])
      })
    ])
  ]);
};
export default {Trade};
