/* eslint-disable max-len */
import { CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FetchButton from './FetchButton';

const OrderBook = () => {
  const [orders, setOrders] = useState([]);
  const currencyPair = 'btc_mxn';
  const types = 'trades';

  useEffect(() => {
    const websocket = new WebSocket('wss://ws.bitso.com');

    websocket.onopen = () => {
      websocket.send(JSON.stringify({ action: 'subscribe', book: currencyPair, type: types }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === types && data.payload) {
        const time = new Date().toLocaleString();

        const dataArray = [...data.payload, time];
        setOrders((prev) => [...prev, dataArray]);
      }
    };

    websocket.onclose = () => {
      websocket.close();
    };

    return () => {
      websocket.close();
    };
  }, [orders.length]);

  return (
    <div className="order-container">
      {(orders.length > 4 && <FetchButton data={orders} currencyPair={currencyPair} />) || (<button type="button" className="download" disabled="true">Waiting Trades</button>)}
      <div className="trades">
        <h3>
          Trades in
          {' '}
          {currencyPair.toUpperCase()}
        </h3>
        <div className="loading-screen">
          {orders.length < 1 && <CircularProgress color="secondary" />}
        </div>
        <ul>
          {orders.map((data) => (
            <li key={data[0].i}>
              <p>{`[${data[0].i}] ${data[0].a} BTC @ ${data[0].r} MXN = ${data[0].v} MXN Date: ${data[1]}`}</p>
              <span>---------------------------------------------------------------------------------------------------------------</span>
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default OrderBook;
