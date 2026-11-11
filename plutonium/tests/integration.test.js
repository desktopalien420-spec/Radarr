/**
 * Plutonium Integration Tests for Radarr
 */

import { registerRadarrApp } from '../registry/appRegistry';
import { plutoniumAuthAdapter } from '../auth/plutoniumAuthAdapter';
import { PlutoniumApiAdapter } from '../adapters/apiAdapter';

describe('Plutonium Radarr Integration', () => {
  test('app registration works', () => {
    const mockRegistry = {
      registered: [],
      register(app) {
        this.registered.push(app);
      }
    };
    const app = registerRadarrApp(mockRegistry);
    expect(mockRegistry.registered.length).toBe(1);
    expect(app.id).toBe('com.plutonium.radarr');
    expect(app.name).toBe('Radarr');
  });

  test('auth adapter initializes', () => {
    const adapter = plutoniumAuthAdapter;
    expect(adapter).toBeDefined();
    expect(typeof adapter.getApiKey).toBe('function');
    expect(typeof adapter.getAuthHeaders).toBe('function');
  });

  test('api adapter can be instantiated', () => {
    const adapter = new PlutoniumApiAdapter('/api/v3');
    expect(adapter.baseUrl).toBe('/api/v3');
    expect(typeof adapter.get).toBe('function');
    expect(typeof adapter.post).toBe('function');
  });
});
