/**
 * Plutonium App Wrapper for Radarr
 * Wraps Radarr app with Plutonium desktop environment integration
 */

import React, { useEffect } from 'react';
import { initPlutoniumTheme } from '../theme';
import { plutoniumAuthAdapter } from '../auth/plutoniumAuthAdapter';

const PlutoniumAppWrapper = ({ children }) => {
  useEffect(() => {
    // Initialize Plutonium theme
    initPlutoniumTheme();
    
    // Initialize Plutonium auth
    plutoniumAuthAdapter.initialize();
    
    // Add Plutonium window class for styling
    if (typeof document !== 'undefined') {
      document.body.classList.add('plutonium-window-context');
    }
  }, []);

  return (
    <div className="plutonium-app-wrapper" data-plutonium-app="radarr">
      {children}
    </div>
  );
};

export default PlutoniumAppWrapper;
