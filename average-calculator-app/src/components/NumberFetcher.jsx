import React, { useState } from "react";
import axios from "axios";
import { API_URLS } from "../utils/apiUrls";
import { calculateAverage } from "../utils/averageUtils";

const NumberFetcher = ({ type, windowSize = 10 }) => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchData = async () => {
    if (!API_URLS[type]) {
      alert("Invalid Type");
      return;
    }

    let newNumbers = [];
    try {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => source.cancel(), 500);

      const response = await axios.get(API_URLS[type], {
        cancelToken: source.token,
      });

      clearTimeout(timeout);
      newNumbers = response.data.numbers;

    } catch (error) {
      console.error("Error fetching numbers:", error.message);
      return;
    }

    const uniqueNew = newNumbers.filter((num) => !windowCurrState.includes(num));
    const updated = [...windowCurrState, ...uniqueNew].slice(-windowSize);

    setWindowPrevState([...windowCurrState]);
    setWindowCurrState(updated);
    setResponseData(uniqueNew);
    setAverage(calculateAverage(updated));
  };

  return (
    <div>
      <h2>Number Type: {type.toUpperCase()}</h2>
      <button onClick={fetchData}>Fetch & Compute</button>
      <pre>{JSON.stringify({
        windowPrevState,
        windowCurrState,
        numbers: responseData,
        avg: average
      }, null, 2)}</pre>
    </div>
  );
};

export default NumberFetcher;
 
