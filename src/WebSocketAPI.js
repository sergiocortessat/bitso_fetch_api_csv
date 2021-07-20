const Socket = () => {
const websocket = new WebSocket('wss://ws.bitso.com');

const arri = []
websocket.onopen = function() {
    websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }));
};

websocket.onmessage = function(message){
    var data = JSON.parse(message.data);
    console.log(data);
    if (data.type === 'trades' && data.payload && arri.length <= 1) {
       arri.push(data.payload)
       return arri
    }
}
}

export default Socket;