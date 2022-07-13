const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ISSUER = process.env.REACT_APP_ISSUER;

export const oktaConfig = {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
