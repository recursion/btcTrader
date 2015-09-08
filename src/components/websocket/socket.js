//var CEX = require('coinbase-exchange');
//var ws = CEX.WebsocketClient();
// For the life of me I cannot get this working properly with socket.io
// in its current state I am using socket.io to import WebSocket, which is what Im actually using.
// It appears to be related to xss blocking?

require('socket.io-client');
var ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");


var req = {
  "type": "subscribe",
  "product_id": "BTC-USD"
}

ws.onopen = function() {
  ws.send(JSON.stringify(req));
};

ws.onconnect = function(){
  console.log('Connected');
};

ws.onmessage = function(evt) {
  var e = null;

  let data = JSON.parse(evt.data);

  if (data.type === 'match'){
    console.log(data);

    e = new CustomEvent('match', {detail: data});

    window.dispatchEvent(e);

  } else if (data.type === 'open'){
    //console.log(data);

    e = new CustomEvent('open', {detail: data});

    window.dispatchEvent(e);

  }

};

ws.onclose = function() {
 };
