/**
 * Plutonium Cloud App Registry Entry for Radarr
 * Registers Radarr as a launchable app in the Plutonium desktop environment
 */

export const radarrApp = {
  id: 'com.plutonium.radarr',
  name: 'Radarr',
  icon: '/plutonium/icons/radarr.svg',
  description: 'Movie collection manager',
  component: 'RadarrApp',
  windowOptions: {
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    resizable: true
  },
  category: 'media',
  keywords: ['movies', 'usenet', 'torrent', 'pvr']
};

export function registerRadarrApp(appRegistry) {
  if (appRegistry && typeof appRegistry.register === 'function') {
    appRegistry.register(radarrApp);
  }
  return radarrApp;
}

export default radarrApp;
