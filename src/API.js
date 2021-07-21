const currentCurrency = 'btc_brl';
const URLBRL = `https://api.bitso.com/v3/order_book/?book=${currentCurrency}`;

const fetching = async () => {
  try {
    const data = await fetch(URLBRL, {
      method: 'GET',
      mode: 'cors',
    });
    const fetchData = await data.json();
    const bestBidSizes = fetchData.payload.bids.sort(
      (a, b) => a.amount - b.amount,
    );
    const bestBidSize = bestBidSizes[bestBidSizes.length - 1];
    const bestBidPrices = fetchData.payload.bids.sort(
      (a, b) => a.price - b.price,
    );
    const bestBidPrice = bestBidPrices[bestBidPrices.length - 1];
    const bestAskSizes = fetchData.payload.asks.sort(
      (a, b) => a.amount - b.amount,
    );
    const bestAskSize = bestAskSizes[bestAskSizes.length - 1];
    const bestAskPrices = fetchData.payload.asks.sort(
      (a, b) => a.price - b.price,
    );
    const bestAskPrice = bestAskPrices[bestAskPrices.length - 1];

    const midPrice = bestBidPrices.reduce((acc, b) => acc + Number(b.price), 0)
        / bestBidPrices.length;

    const askBidSpread = bestAskSize.price - bestBidSize.price;

    return {
      bestBidSize,
      bestBidPrice,
      bestAskSize,
      bestAskPrice,
      midPrice,
      askBidSpread,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default fetching;
