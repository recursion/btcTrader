var CEX = require('coinbase-exchange');
var ws = new CEX.WebsocketClient();

ws.on('connect', function(data) {
  console.log('Connected: ', data);
});

ws.on('message', function(data) {
  if (data.type === 'match'){
    console.log(data);
  } else if (data.type === 'open'){
    console.log(data);
  }
});
