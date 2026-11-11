/**
 * Plutonium Theme Loader for Radarr
 */

import './plutonium-theme.css';

export function initPlutoniumTheme() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('plutonium-theme');
    document.body.classList.add('plutonium-desktop');
  }
}

export default { initPlutoniumTheme };
