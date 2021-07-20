import React from 'react';
import ObjectsToCsv from 'objects-to-csv'

function FetchButton(prop) {
    // const data = [
    //     {code: "hello", name: 'California'}
    //   ];

const rows = [
    ["name1", "city1", "some other info"],
    ["name2", "city2", "more info"]
];
    const fetchCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
    // encodeURI(csvContent);
    window.open("data:text/csv;charset=utf-8," + escape(csvContent))

    }
    return (
        <button type="button" onClick={fetchCSV}>
            Index
        </button>
    )
}

export default FetchButton;