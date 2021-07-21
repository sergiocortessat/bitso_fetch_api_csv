import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import OrderBook from './FetchWebScoket';
import Card from './Card';
import API from './API';

const fetchCurrency = 'btc_brl';

function App() {
  const [bidSize, setBidSize] = useState({});
  const [bidPrice, setBidPrice] = useState({});
  const [askSize, setAskSize] = useState({});
  const [askPrice, setAskPrice] = useState({});
  const [midPrice, setMidPrice] = useState();
  const [bidSpread, setBidSpread] = useState();

  const currentCurrency = fetchCurrency.split('_')[1].toUpperCase();
  const cards = [
    {
      name: 'Bid Size', value: bidSize.amount, currency: currentCurrency, key: '1',
    },
    {
      name: 'Bid Price', value: bidPrice.price, currency: currentCurrency, key: '2',
    },
    {
      name: 'Ask Size', value: askSize.amount, currency: 'Units', key: '3',
    },
    {
      name: 'Ask Price', value: askPrice.price, currency: currentCurrency, key: '4',
    },
    {
      name: 'Mid Price', value: midPrice, currency: currentCurrency, key: '5',
    },
    {
      name: 'Bid Spread', value: bidSpread, currency: 'BRL', key: '6',
    },
  ];
  useEffect(() => {
    API().then((data) => {
      const {
        bestBidSize, bestBidPrice, bestAskPrice, bestAskSize, midPrice, askBidSpread,
      } = data;
      setBidSize(bestBidSize);
      setBidPrice(bestBidPrice);
      setAskSize(bestAskSize);
      setAskPrice(bestAskPrice);
      setMidPrice(midPrice);
      setBidSpread(askBidSpread);
    });
  }, []);

  return (
    <div className="App">
      <div className="typewritter">
        <h1>Check Trades in </h1>
        <Typewriter
          options={{
            strings: ['BTC', 'MXN', 'BRL'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <h2>
        General data for
        {' '}
        {currentCurrency}
      </h2>
      <div className="App-header">
        {cards.map((data) => (
          <Card key={data.key} name={data.name} data={data.value} currency={data.currency} />
        ))}
      </div>
      <span className="border-line" />
      <OrderBook />
    </div>
  );
}

export default App;
