import React from 'react';
import Stock from './Stock';

const StockList = ({ stocks }) => {
    return (
        <div>
            {stocks.map((stock, index) => (
                <Stock key={index} stock={stock} />
            ))}
        </div>
    );
};

export default StockList; 
