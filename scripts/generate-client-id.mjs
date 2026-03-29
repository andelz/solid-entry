/**
 * Generates the Solid-OIDC Client ID Document into the build output.
 * Runs as a postbuild step so the proxy bypass handles /id during dev
 * while production gets a proper static file.
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const origin = 'https://solid-entry.netlify.app';

const doc = {
  '@context': 'https://www.w3.org/ns/solid/oidc-context.jsonld',
  client_id: `${origin}/id`,
  client_name: 'Solid Onboarding',
  redirect_uris: [`${origin}/onboarding/callback`],
  post_logout_redirect_uris: [`${origin}/`],
  client_uri: `${origin}/`,
  scope: 'openid profile webid offline_access',
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  token_endpoint_auth_method: 'none',
  application_type: 'web',
};

// Angular v17+ outputs to dist/<project>/browser
const outDir = resolve(__dirname, '..', 'dist', 'solid-entry', 'browser');
writeFileSync(resolve(outDir, 'id'), JSON.stringify(doc, null, 2) + '\n');
console.log('✓ Client ID Document written to dist/solid-entry/browser/id');
