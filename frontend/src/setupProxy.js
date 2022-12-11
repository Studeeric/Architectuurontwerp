const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:1790';

module.exports = function(app) {
  const backendProxy = createProxyMiddleware(["/attractie"], {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(backendProxy);

  const suggestieProxy = createProxyMiddleware(["/suggestie"], {
    target: "http://suggestieservice:7290",
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(suggestieProxy);
};
