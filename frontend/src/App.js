import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState("Loading...");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setApiResponse(JSON.stringify(data, null, 2));
      })
      .catch(err => {
        setApiResponse(`Failed to fetch: ${err.toString()}`);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Response from the backend API:
        </p>
        <pre style={{ textAlign: 'left', backgroundColor: '#282c34', padding: '1rem', borderRadius: '5px', width: '80%' }}>
          {apiResponse}
        </pre>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
