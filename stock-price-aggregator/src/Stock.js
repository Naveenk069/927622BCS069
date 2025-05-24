import React from 'react';

const Stock = ({ stock }) => {
    return (
        <div>
            <h3>{stock.time}</h3>
            <p>Open: {stock.open}</p>
            <p>High: {stock.high}</p>
            <p>Low: {stock.low}</p>
            <p>Close: {stock.close}</p>
            <p>Volume: {stock.volume}</p>
            <hr />
        </div>
    );
};

export default Stock;


