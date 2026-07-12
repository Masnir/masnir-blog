/**
 * Decap CMS — GitHub OAuth step 1: begin the login flow.
 *
 * Decap opens this endpoint in a popup. We redirect the user to GitHub's
 * authorize page, asking for `repo` scope so the CMS can commit content.
 * GitHub then redirects back to our /oauth/callback function.
 *
 * Requires env vars (set in Netlify → Site configuration → Environment):
 *   OAUTH_GITHUB_CLIENT_ID     — from your GitHub OAuth App
 *   OAUTH_GITHUB_CLIENT_SECRET — from your GitHub OAuth App (used in callback)
 */
exports.handler = async (event) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return { statusCode: 500, body: 'Missing OAUTH_GITHUB_CLIENT_ID env var.' };
  }

  // Build the callback URL from the incoming request's host so this works on
  // any domain (preview, netlify.app, or blog.masnir.site) with no hardcoding.
  const proto = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers.host;
  const redirectUri = `${proto}://${host}/oauth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo',
    // A random state value guards against CSRF on the OAuth handshake.
    state: Math.random().toString(36).slice(2),
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      'Cache-Control': 'no-cache',
    },
    body: '',
  };
};
