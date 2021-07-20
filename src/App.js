import { useEffect, useState } from 'react'
import OrderBook from './FetchWebScoket';
import Typewriter from 'typewriter-effect';
import Card from './Card';
const currentCurrency = 'btc_brl'
const URLBRL =  `https://api.bitso.com/v3/order_book/?book=${currentCurrency}`


function App() {
  const [bidSize, setBidSize]  = useState({})
  const [bidPrice, setBidPrice]  = useState({})
  const [askSize, setAskSize]  = useState({})
  const [askPrice, setAskPrice]  = useState({})
  const [midPrice, setMidPrice]  = useState()
  const [bidSpread, setBidSpread]  = useState()

  const fetching = async () => {
    try {
      const data = await fetch(URLBRL,{
          method: 'GET',
          mode: 'cors',
      })
      const fetchData = await data.json()
      console.log('--------------');
      console.log(fetchData)
      const bestBidSizes = fetchData.payload.bids.sort((a, b) => a.amount - b.amount)
      const bestBidSize = bestBidSizes[bestBidSizes.length-1]
      setBidSize(bestBidSize);
      const bestBidPrices =  fetchData.payload.bids.sort((a, b) => a.price - b.price)
      const bestBidPrice = bestBidPrices[bestBidPrices.length-1]
  setBidPrice(bestBidPrice);
      const bestAskSizes =  fetchData.payload.asks.sort((a, b) => a.amount - b.amount)
      const bestAskSize = bestAskSizes[bestAskSizes.length-1]
      setAskSize(bestAskSize);
      const bestAskPrices =  fetchData.payload.asks.sort((a, b) => a.price - b.price)
      const bestAskPrice = bestAskPrices[bestAskPrices.length-1]
      setAskPrice(bestAskPrice);

      const midPrice = bestBidPrices.reduce( (acc, b) => acc + Number(b.price), 0)/bestBidPrices.length
      setMidPrice(midPrice);

      
      const askBidSpread = bestAskSize.price - bestBidSize.price
      setBidSpread(askBidSpread);


      return {bestBidSize, bestBidPrice, bestAskSize, bestAskPrice, midPrice, askBidSpread}
      
      
      }catch(error) {
          console.log(error)
      }
  }

  const cards = [
    {name: 'Bid Size', value: bidSize.amount, currency: 'Units'},
  {name: 'Bid Price', value: bidPrice.price, currency: 'BRL'},
  {name: 'Ask Size', value: askSize.amount, currency: 'Units'},
 {name: 'Ask Price', value: askPrice.price, currency: 'BRL'},
    {name: 'Mid Price', value: midPrice, currency: 'BRL'},
  {name: 'Bid Spread', value: bidSpread, currency: 'BRL'},
  ]
useEffect(() => {
 fetching()
 },[])

  return (
    <div className="App">
      <div className='typewritter'>

<h1>Check Trades in </h1>
<Typewriter
   options={{
     strings: ['BTC', 'MXN', 'BRL'],
     autoStart: true,
     loop: true,
   }}
  />
      </div>
      <h2>General data for {currentCurrency.toUpperCase()}</h2>
    <div className="App-header">
      {cards.map(data => {
        console.log(data);
       return  <Card name={data.name} data={data.value} currency={data.currency}/>
       
      })}
  
     </div>
     <span className='border-line'></span>
     <OrderBook />
</div>

  );
}

export default App;


