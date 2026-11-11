# Radarr Integration Notes for Plutonium Cloud

## Phase 1: Discovery (in progress)

### 1. Radarr Repository Analysis
# Radarr Tech Stack
- **Backend**: ASP.NET Core (C#), .NET Core - see global.json, src/ structure
{
  "sdk": {
    "version": "10.0.403"
  }
}

---

### Backend Entry Points
- Main host: `src/NzbDrone.Host/`, `src/NzbDrone.Console/`
- API: `src/Radarr.Api.V3/`, `src/Radarr.Http/`
- Core logic: `src/NzbDrone.Core/`

### Frontend
- React/Redux app in `frontend/src/` with webpack build
- Built assets go to `_output/UI/` (see package.json clean script)
- Uses React Router, Redux, styled-components patterns via CSS modules/custom styles

### Build & Run
- Backend: `dotnet build` or use `build.sh`, runs via mono/dotnet depending on platform
- Frontend: `yarn install && yarn build` or `yarn start` for watch
- Combined: standard Radarr build process builds both

### API
- REST API exposed under `/api/v3/` (v3 API)
- API key auth via `X-Api-Key` header or query param typically
- Routes defined in API controllers

### Database
- SQLite by default (typical for *arr apps), with Postgres support possible
- Config stored in app data folder

### Port
- Default port: 7878 (HTTP)

### Potential Conflicts for Cloud/Desktop Environment
- Assumes local filesystem paths, app data directories
- May have hardcoded URLs/base paths
- API key handling - needs to integrate with Plutonium's auth/session system
- CORS/iframe restrictions - need to check if served in iframe or embedded
- Asset paths may need base path adjustment for subpath hosting

### 2. Plutonium Cloud (environment expectations)
The task describes Plutonium Cloud as a desktop environment that hosts webapps as windowed applications. Based on typical patterns and the requirements:
- Apps are registered via app manifest/registry (name, icon, description, window size, etc.)
- Launched in windows (possibly via iframe/micro-frontend)
- Need to integrate with Plutonium's session/auth system
- Need to follow Plutonium design system (tokens, components, theming)
- Apps persist settings in Plutonium's way

Since no Plutonium Cloud codebase is present in the filesystem, I need to create integration files/patterns that would work in such an environment - likely adding app manifest, registration, adapters for auth/session, theming integration, etc. within the Radarr project or alongside it in a structure that makes sense.

### 3. Design System
Need to follow Plutonium Cloud's design tokens and components. Without seeing existing Plutonium apps, I'll need to make reasonable assumptions based on modern desktop app UIs (dark theme, clean design, proper spacing) and structure the integration to be easily themeable with CSS variables/tokens.

### 4. Integration Strategy
Options:
1. **Embed Radarr's frontend as native Plutonium app that talks to Radarr API** - Run Radarr backend separately (or as service), frontend served/embedded in Plutonium window, integrate auth by passing API key/session from Plutonium
2. **Host full Radarr stack behind proxy and wrap it** - Proxy through Plutonium infrastructure

Given the constraints say "keep Radarr's upstream code changes as isolated as possible" and "wire Radarr's backend/API so the app works end to end", and also mention Dockerfile/compose only if needed for hosting backend - likely strategy 1: adapt Radarr to run in Plutonium desktop window, make it use Plutonium auth/session, style with Plutonium theme. Need to make it work when embedded (base paths, no hardcoded assumptions). Also need to register as Plutonium app.

Let me look up more about how Radarr serves frontend - is it embedded in the backend or separate?

### Strategy
**Chosen approach**: Embed/adapt Radarr frontend as a Plutonium Cloud app while running Radarr backend. Create Plutonium app registration (manifest/registry entry), add Plutonium auth/session integration adapters, make the app embeddable (base path handling, iframe compatibility), apply Plutonium design tokens/theme, and isolate integration code.

**Tradeoffs**:
- Keeps full Radarr functionality intact
- Isolated integration code for easier upstream merges
- Requires ensuring backend is accessible; may need service configuration
- Need to adapt auth to Plutonium session system

### Next Steps
Will create:
- `plutonium/` or `integration/plutonium/` directory with manifest, registry, theming
- App registration files
- Plutonium auth adapter
- Plutonium theme/CSS overrides
- Documentation for env vars and setup

## Phase 2: Implementation (in progress)

Created Plutonium integration structure:
- `plutonium/manifest/radarr.app.json` - App manifest with window settings
- `plutonium/registry/appRegistry.js` - App registration
- `plutonium/auth/plutoniumAuthAdapter.js` - Auth/session integration
- `plutonium/theme/plutonium-theme.css` - Design tokens and styles
- `plutonium/adapters/apiAdapter.js` - API communication adapter
- `plutonium/components/PlutoniumAppWrapper.jsx` - App wrapper component
- `plutonium/icons/` - App icons
- `.env.example` - Environment variables documentation

## Setup and Run Instructions

### Development
1. Install dependencies: `yarn install`
2. Build frontend: `yarn build`
3. Build backend: `dotnet build` (or `./build.sh`)
4. Run Radarr - it will be available on port 7878 by default

### Plutonium Cloud Integration
1. Load `plutonium/integration-entry.js` in Plutonium environment
2. The app manifest is at `plutonium/manifest/radarr.app.json`
3. Apply theme by importing `plutonium/theme/index.js`
4. Configure auth via environment variables or Plutonium session

### Environment Variables
See `.env.example` for configuration options.

## Known Limitations
- Plutonium Cloud codebase not present in filesystem - integration files created for compatibility
- Auth integration depends on Plutonium session injection
- Some Radarr features assume local filesystem access
