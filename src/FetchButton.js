/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-sequences */
import React from 'react';
import PropTypes from 'prop-types';

function FetchButton({ data, currencyPair }) {
  const rows = [
    ['Date', 'Time', `Price ${currencyPair}`, 'Volume'],
  ];

  for (const i in data) {
    const date = data[i][1].split(',').splice(0, 1)[0];
    const time = data[i][1].split(',').splice(0, 2)[1];
    const volume = data[i][0].a;
    const amount = data[i][0].v;
    rows.push([date, time, volume, amount]);
  }

  // console.log(rows)
  const fetchCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,${
      rows.map((e) => e.join(',')).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };
  return (
    <button className="download" type="button" onClick={fetchCSV}>
      Download Trades
      {' '}
      {currencyPair.toUpperCase()}
    </button>
  );
}

export default FetchButton;

// props validation
FetchButton.propTypes = {
  data: PropTypes.isRequired,
  currencyPair: PropTypes.string.isRequired,
};
