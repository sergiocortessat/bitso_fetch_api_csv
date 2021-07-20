import React, { useState, useEffect } from 'react';
import FetchButton from './FetchButton';
const OrderBook = () => {
  const [orders, setOrders] = useState([]);
  const currencyPair = 'btc_mxn';
  const types = 'trades'

  useEffect(() => {
    const websocket = new WebSocket('wss://ws.bitso.com');

    websocket.onopen = function() {
        websocket.send(JSON.stringify({ action: 'subscribe', book: currencyPair, type: types }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === types && data.payload) {
        const time = new Date().toLocaleString();

        const dataArray = [...data.payload, time] 
        setOrders((prev) => [...prev,dataArray]);

    }};

    websocket.onclose = () => {
      websocket.close();
    };

    return () => {
      websocket.close();
    };
  }, [orders.length]);
  
//   const { bids, asks } = orders;
//   const orderRows = (arr) =>
//     arr &&
//     arr.map((item, index) => (
//       <tr key={index}>
//         <td> {item[1]} </td>
//         <td> {item[0]} </td>
//       </tr>
//     ));
//   const orderHead = (title) => (
//     <thead>
//       <tr>
//         <th colSpan="2">{title}</th>
//       </tr>
//       <tr>
//         <th>Amount ({currencyArray[0]})</th>
//         <th>Price ({currencyArray[1]})</th>
//       </tr>
//     </thead>
//   );
  return (
      <div className="order-container">
        {(orders.length >4 && <FetchButton data={orders} currencyPair={currencyPair}/>) || (<button className='download' disabled='true'>Waiting Trades</button>)}
        <div className='trades'>
        <h3>Trades</h3>
        {orders.length < 1 && <p>Waiting for a trade...</p>}
        <ul>
     {orders.map((data) => (
             <li key={data[0].i}>
                 <p>{'[' + data[0]['i'] + '] ' + data[0]['a'] + ' BTC @ ' + data[0]['r'] + ' MXN = ' + data[0]['v'] + ' MXN ' + 'Date: ' + data[1]}</p>
                 <span>---------------------------------------------------------------------------------------------------------------</span>
                 <br/>
                 <br/>
             </li>
         ))}
     </ul>
</div>
      {/* <table>
        {orderHead('Asks')}
        <tbody>{orderRows(asks)}</tbody>
      </table> */}
    </div>
  );
};

export default OrderBook;
