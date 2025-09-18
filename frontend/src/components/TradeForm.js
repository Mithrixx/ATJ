
import React, { useState } from 'react';

// Basic styling for the form (can be moved to a CSS file later)
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};


const TradeForm = ({ onTradeAdded }) => {
  const [ticker, setTicker] = useState('');
  const [action, setAction] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trade = {
      ticker: ticker.toUpperCase(),
      action: action,
      quantity: parseFloat(quantity),
      price: parseFloat(price)
    };

    fetch(`${process.env.REACT_APP_API_URL}trades/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to submit trade.');
      }
      return res.json();
    })
    .then(() => {
      setSuccess('Trade added successfully!');
      // Clear form
      setTicker('');
      setAction('buy');
      setQuantity('');
      setPrice('');
      onTradeAdded(); // Call the callback to refresh the trade list
    })
    .catch(err => {
      setError(err.toString());
    });
  };

  return (
    <div>
      <h2>Add a New Trade</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="ticker">Ticker</label>
        <input
          type="text" id="ticker" name="ticker" style={inputStyle} required
          value={ticker} onChange={(e) => setTicker(e.target.value)}
        />

        <label htmlFor="action">Action</label>
        <select
          id="action" name="action" style={inputStyle}
          value={action} onChange={(e) => setAction(e.target.value)}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number" id="quantity" name="quantity" step="any" style={inputStyle} required
          value={quantity} onChange={(e) => setQuantity(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number" id="price" name="price" step="any" style={inputStyle} required
          value={price} onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit" style={buttonStyle}>Add Trade</button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default TradeForm;
