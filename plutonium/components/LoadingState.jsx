import React from 'react';

const LoadingState = ({ message = 'Loading...' }) => (
  <div className="plutonium-loading" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    color: 'var(--plutonium-text-secondary)',
    fontFamily: 'var(--plutonium-font-sans)'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '8px' }}>⟳</div>
      <div>{message}</div>
    </div>
  </div>
);

export default LoadingState;
