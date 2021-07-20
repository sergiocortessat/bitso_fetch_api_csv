import { useEffect, useState } from 'react'
import OrderBook from './FetchWebScoket';
const URLBRL =  "https://api.bitso.com/v3/order_book/?book=btc_brl"


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
          // headers: {
          //     'Access-Control-Allow-Origin': '*/*',
          // },
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

useEffect(() => {
//  fetching()
 },[])

  return (
    <div className="App">
    <div className="App-header">
     <p>Bid Size:{bidSize.amount}</p>
     <p>Bid Price: {bidPrice.price}</p>
     <p>Ask Size: {askSize.amount}</p>
     <p>Ask Price: {askPrice.price}</p>
     <p>Mid Price: {midPrice}</p>
     <p>Bid Spread: {bidSpread}</p>
     </div>
     <OrderBook />
</div>

  );
}

export default App;


