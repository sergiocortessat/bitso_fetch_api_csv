import React, { useState, useEffect } from 'react';
import FetchButton from './FetchButton';
const OrderBook = () => {
  const [orders, setOrders] = useState([]);
  const currencyPair = 'btcusd';
//   const URLBRL =  "https://api.bitso.com/v3/order_book/?book=btc_brl"
  // const URLMXN =  "https://api.bitso.com/v3/order_book/?book=btc_mxn"
//   const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

  useEffect(() => {
    const websocket = new WebSocket('wss://ws.bitso.com');

    websocket.onopen = function() {
        websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trades' && data.payload && orders.length < 5) {
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
        {orders.length === 5 && <FetchButton data={orders}/>}
        <ul>
     {orders.map((data) => (
             <li key={data[0].i}>
                 <p>{data[0].v}</p>
                 <p>{data[0].a}</p>
                 <p>{data[1]}</p>
           
             </li>
     ))}
     </ul>

      {/* <table>
        {orderHead('Asks')}
        <tbody>{orderRows(asks)}</tbody>
      </table> */}
    </div>
  );
};

export default OrderBook;
