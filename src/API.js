const URLBRL =  "https://api.bitso.com/v3/order_book/?book=btc_brl"
const URLMXN =  "https://api.bitso.com/v3/order_book/?book=btc_mxn"

const apiFetch = async () => {
    try {
    const data = await fetch(URLBRL,{
        method: 'GET',
        mode: 'cors',
        // headers: {
        //     'Access-Control-Allow-Origin': '*/*',
        // },
    })
    const fetchData = data.json()
    return fetchData

    
    }catch(error) {
        console.log(error)
    }
}

export default apiFetch;


// const url = "https://api.bitso.com/v3/order_book/?book=btc_mxn"

// // fetch the data from the API and sort by best bid and best ask
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const bids = data.bids.sort((a, b) => b[1] - a[1])
//     const asks = data.asks.sort((a, b) => a[1] - b[1])
//     const bid = bids[0]
//     const ask = asks[0]
//     const bidPrice = bid[1]
//     const askPrice = ask[1]
//     const bidAmount = bid[0]
//     const askAmount = ask[0]
//     const spread = askPrice - bidPrice
//     const midPrice = (bidPrice + askPrice) / 2
//     const midAmount = (bidAmount + askAmount) / 2
//     const mid = [midPrice, midAmount]

//     // return the data to the user
//     return {
//       bidPrice,
//       askPrice,
//       bidAmount,
//       askAmount,
//       spread,
//       midPrice,
//       midAmount,
//       mid
//     }
//   }
// )
//   .then(data => console.log(data))
//   .catch(err => console.log(err))
