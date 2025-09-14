import React, { useState, useEffect } from 'react';
import './App.css';
import TradeList from './components/TradeList';
import TradeForm from './components/TradeForm';

function App() {
  // const [trades, setTrades] = useState([]);
  // const [error, setError] = useState(null);

  // const fetchTrades = () => {
  //   fetch(`${process.env.REACT_APP_API_URL}trades/`)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then(data => setTrades(data))
  //     .catch(err => setError(err.toString()));
  // };

  // useEffect(() => {
  //   fetchTrades();
  // }, []);

  // A dummy function for the prop
  const fetchTrades = () => console.log("Fetching trades...");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Advanced Trading Journal</h1>
      </header>
      <main>
        <p>Debugging: Trying to render only the form.</p>
        <TradeForm onTradeAdded={fetchTrades} />
        {/* <hr /> */}
        {/* {error ? <p style={{ color: 'red' }}>{error}</p> : <TradeList trades={trades} />} */}
      </main>
    </div>
  );
}

export default App;
