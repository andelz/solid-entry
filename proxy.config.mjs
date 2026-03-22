/**
 * Angular dev-server proxy config.
 * Serves the Solid-OIDC Client ID Document at /id with the required
 * Content-Type: application/ld+json so Solid servers can fetch and
 * verify the app's declared scopes (openid profile webid only).
 */
export default {
  '/id': {
    target: 'http://localhost:3107',
    bypass(req, res) {
      const origin = `http://${req.headers.host}`;
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
      res.setHeader('Content-Type', 'application/ld+json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(doc, null, 2));
      return false;
    },
  },
};
