export const environment = {
  production: false,
  cognito: {
      tokenUrl: 'https://cutme.auth.us-east-1.amazoncognito.com/oauth2/token',
      clientId: '3f5nviob425f0tjhhljmsm7n8p',
      userPoolId: 'us-east-1_POLxfwFzO',
      userPoolWebClientId: '3f5nviob425f0tjhhljmsm7n8p',
      redirectUri: 'http://localhost:4200/callback',
      cognitoDomain: 'https://cutme.auth.us-east-1.amazoncognito.com',
      scope: 'openid profile email',
      responseType: 'code'
    },
    apiBaseUrl: "http://api-cutme-load-balancer-1601953081.us-east-1.elb.amazonaws.com"
};
