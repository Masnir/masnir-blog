/**
 * Decap CMS — GitHub OAuth step 2: exchange the code for a token.
 *
 * GitHub redirects here with a `?code=...`. We exchange it for an access token,
 * then post the result back to the CMS window (which opened the popup) using the
 * postMessage handshake Decap expects, and close the popup.
 *
 * Requires env vars:
 *   OAUTH_GITHUB_CLIENT_ID
 *   OAUTH_GITHUB_CLIENT_SECRET
 */
exports.handler = async (event) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = event.queryStringParameters && event.queryStringParameters.code;

  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: 'Missing GitHub OAuth env vars.' };
  }
  if (!code) {
    return { statusCode: 400, body: 'Missing OAuth code.' };
  }

  // Exchange the temporary code for an access token.
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = await tokenRes.json();

  const status = data.access_token ? 'success' : 'error';
  const content = data.access_token
    ? { token: data.access_token, provider: 'github' }
    : { error: data.error || 'Unknown error' };

  // The exact message shape Decap CMS listens for on the opener window.
  const script = `
    <!doctype html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:${status}:${JSON.stringify(content)}',
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script><p>Completing sign-in…</p></body></html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' },
    body: script,
  };
};
