import React from 'react';

const ErrorState = ({ title = 'Error', message = 'Something went wrong.', onRetry }) => (
  <div className="plutonium-error" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    color: 'var(--plutonium-text-secondary)',
    fontFamily: 'var(--plutonium-font-sans)',
    textAlign: 'center',
    padding: '32px'
  }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
    <h3 style={{ color: 'var(--plutonium-danger)', marginBottom: '8px', fontSize: '18px' }}>{title}</h3>
    <p style={{ marginBottom: onRetry ? '16px' : '0', maxWidth: '400px' }}>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          backgroundColor: 'var(--plutonium-surface)',
          border: '1px solid var(--plutonium-border)',
          color: 'var(--plutonium-text-primary)',
          padding: '8px 16px',
          borderRadius: 'var(--plutonium-radius)',
          cursor: 'pointer',
          fontFamily: 'var(--plutonium-font-sans)'
        }}
      >
        Retry
      </button>
    )}
  </div>
);

export default ErrorState;
