/* eslint-disable no-sequences */
import React from 'react';

function FetchButton({data, currencyPair}) {
    const rows = [
        ["Date", "Time", `Price ${currencyPair}`, "Volume"],
    ];

    for (var i in data) {
        let date = data[i][1].split(',').splice(0, 1)[0]
        let time = data[i][1].split(',').splice(0, 2)[1]
        let volume = data[i][0].a
        let amount = data[i][0].v
        rows.push([date,time,volume,amount])
    }

    // console.log(rows)
    const fetchCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    console.log(rows)

    }
    return ( 
        <button type="button" onClick={fetchCSV}>
            Download Trades
        </button>
    )
}

export default FetchButton;