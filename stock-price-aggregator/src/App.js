import React, { useState } from 'react';
import axios from 'axios';
import StockList from './StockList';
import Search from './Search';

function App() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchStockData = async (symbol) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`https://www.alphavantage.co/query`, {
                params: {
                    function: 'TIME_SERIES_INTRADAY',
                    symbol: symbol,
                    interval: '5min',
                    apikey: '	"token_type": "Bearer",	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY4MTU5LCJpYXQiOjE3NDgwNjc4NTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdhMTgzNDQ4LWZmYmMtNDI1MS1iN2MyLWI5MWYzOWQwZWU3OSIsInN1YiI6Im1uYXZlZW5rMjAwNEBnbWFpbC5jb20ifSwiZW1haWwiOiJtbmF2ZWVuazIwMDRAZ21haWwuY29tIiwibmFtZSI6Im5hdmVlbmt1bWFyIG0iLCJyb2xsTm8iOiI5Mjc2MjJiY3MwNjkiLCJhY2Nlc3NDb2RlIjoid2hlUVV5IiwiY2xpZW50SUQiOiI3YTE4MzQ0OC1mZmJjLTQyNTEtYjdjMi1iOTFmMzlkMGVlNzkiLCJjbGllbnRTZWNyZXQiOiJIVFJIY216VU1FRVpQTlhCIn0.1-NcA0APPyX8CdQyBrHKtJjL-PeQywnYYaRbPFNXm8I",	"expires_in": 1748068159',
                }
            });

            const timeSeries = response.data['Time Series (5min)'];
            if (timeSeries) {
                setStocks(Object.entries(timeSeries).map(([time, data]) => ({
                    time,
                    open: data['1. open'],
                    high: data['2. high'],
                    low: data['3. low'],
                    close: data['4. close'],
                    volume: data['5. volume'],
                })));
            } else {
                throw new Error('Invalid symbol');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="App">
            <h1>Stock Price Aggregator</h1>
            <Search fetchStockData={fetchStockData} />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <StockList stocks={stocks} />
        </div>
    );
}

export default App;