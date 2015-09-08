var CEX = require('coinbase-exchange');
var ws = new CEX.WebsocketClient();

ws.on('connect', function(){
  console.log('Connected');
});

ws.on('message', function(data) {
  var e = null;

  if (data.type === 'match'){
    console.log(data);

    e = new CustomEvent('match', {detail: data});

    window.dispatchEvent(e);

  } else if (data.type === 'open'){
    //console.log(data);

    e = new CustomEvent('open', {detail: data});

    window.dispatchEvent(e);

  }

});
