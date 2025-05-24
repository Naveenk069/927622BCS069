import React, { useState } from 'react';

const Search = ({ fetchStockData }) => {
    const [input, setInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStockData(input);
        setInput('');
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter stock symbol"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search; 
