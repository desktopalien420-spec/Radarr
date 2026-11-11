/**
 * Plutonium Cloud Integration Entry Point for Radarr
 * Main entry point for integrating Radarr into Plutonium desktop environment
 */

import { registerRadarrApp } from './registry/appRegistry';
import { initPlutoniumTheme } from './theme';
import { plutoniumAuthAdapter } from './auth/plutoniumAuthAdapter';
import PlutoniumAppWrapper from './components/PlutoniumAppWrapper';

// Auto-initialize when loaded in Plutonium environment
if (typeof window !== 'undefined') {
  // Check if running in Plutonium environment
  if (window.Plutonium || window.plutonium) {
    initPlutoniumTheme();
    plutoniumAuthAdapter.initialize();
    
    // Register app if app registry is available
    if (window.plutoniumAppRegistry) {
      registerRadarrApp(window.plutoniumAppRegistry);
    }
  }
}

export {
  registerRadarrApp,
  initPlutoniumTheme,
  plutoniumAuthAdapter,
  PlutoniumAppWrapper
};

export default {
  registerRadarrApp,
  initPlutoniumTheme,
  plutoniumAuthAdapter,
  PlutoniumAppWrapper
};
