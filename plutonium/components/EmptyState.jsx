import React from 'react';

const EmptyState = ({ title = 'No items', message = 'Nothing to show here.', action }) => (
  <div className="plutonium-empty" style={{
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
    <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
    <h3 style={{ color: 'var(--plutonium-text-primary)', marginBottom: '8px', fontSize: '18px' }}>{title}</h3>
    <p style={{ marginBottom: action ? '16px' : '0', maxWidth: '400px' }}>{message}</p>
    {action && <div>{action}</div>}
  </div>
);

export default EmptyState;
