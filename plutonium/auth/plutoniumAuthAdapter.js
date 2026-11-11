/**
 * Plutonium Cloud Auth/Session Adapter for Radarr
 * Integrates Radarr with Plutonium's session/auth system
 */

export class PlutoniumAuthAdapter {
  constructor() {
    this.apiKey = null;
    this.session = null;
  }

  /**
   * Initialize auth from Plutonium session
   */
  initialize() {
    // Try to get session from Plutonium environment
    if (typeof window !== 'undefined') {
      // Check for Plutonium injected session
      if (window.Plutonium && window.Plutonium.session) {
        this.session = window.Plutonium.session;
        this.apiKey = window.Plutonium.session.apiKey || window.Plutonium.apiKey;
      }
      // Check for passed auth token
      if (window.PLUTONIUM_API_KEY) {
        this.apiKey = window.PLUTONIUM_API_KEY;
      }
      // Check URL params as fallback (dev only)
      const params = new URLSearchParams(window.location.search);
      if (params.get('apikey')) {
        this.apiKey = params.get('apikey');
      }
    }
    return this.apiKey;
  }

  /**
   * Get API key for Radarr API calls
   */
  getApiKey() {
    if (!this.apiKey) {
      this.initialize();
    }
    return this.apiKey;
  }

  /**
   * Add auth headers to requests
   */
  getAuthHeaders() {
    const apiKey = this.getApiKey();
    if (apiKey) {
      return {
        'X-Api-Key': apiKey
      };
    }
    return {};
  }

  /**
   * Check if authenticated
   */
  isAuthenticated() {
    return !!this.getApiKey();
  }
}

export const plutoniumAuthAdapter = new PlutoniumAuthAdapter();

export default plutoniumAuthAdapter;
