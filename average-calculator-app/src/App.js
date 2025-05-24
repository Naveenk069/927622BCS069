import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString()); 
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="app">
      <h1>React Calculator</h1>
      <div className="calculator">
        <input type="text" value={input} readOnly />
        <div className="buttons">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((char) =>
            char === "=" ? (
              <button key={char} onClick={handleCalculate}>=</button>
            ) : (
              <button key={char} onClick={() => handleClick(char)}>{char}</button>
            )
          )}
          <button className="clear" onClick={handleClear}>C</button>
        </div>
      </div>
    </div>
  );
}

export default App;
