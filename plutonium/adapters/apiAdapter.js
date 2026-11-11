/**
 * Plutonium API Adapter for Radarr
 * Handles API communication with Plutonium session integration
 */

import { plutoniumAuthAdapter } from '../auth/plutoniumAuthAdapter';

export class PlutoniumApiAdapter {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.auth = plutoniumAuthAdapter;
  }

  /**
   * Make authenticated API request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.auth.getAuthHeaders(),
      ...(options.headers || {})
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const plutoniumApiAdapter = new PlutoniumApiAdapter(window.Radarr?.urlBase || '');

export default plutoniumApiAdapter;
