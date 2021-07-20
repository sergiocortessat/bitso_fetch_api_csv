var trades_output= document.getElementById('trades-output');
// var diff_orders_output = document.getElementById('diff-orders-output');

var tradesCount = 0;

const websocket = new WebSocket('wss://ws.bitso.com');
websocket.onopen = function() {
    websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }));
};

websocket.onmessage = function(message){
    var data = JSON.parse(message.data);

    if (data.type !== 'ka')
        console.log(data);

    if (data.type === 'trades' && data.payload) {
        if (tradesCount === 0)
            trades_output.innerHTML = '';

        tradesCount++;

        for (var i in data.payload) {
            var trade = data.payload[i];
            var child = document.createElement("div");
            child.innerHTML = '[' + trade['i'] + '] ' + trade['a'] + ' BTC @ ' + trade['r'] + ' MXN = ' + trade['v'] + ' MXN';
            trades_output.appendChild(child);
        }
    }
  
};
