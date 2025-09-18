import React from 'react';

const TradeList = ({ trades }) => {
  return (
    <div>
      <h2>Trade List</h2>
      <pre style={{ textAlign: 'left', backgroundColor: '#f5f5f5', color: '#333', padding: '1rem', borderRadius: '5px', width: '80%', margin: '20px auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {JSON.stringify(trades, null, 2)}
      </pre>
    </div>
  );
};

export default TradeList;
