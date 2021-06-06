const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'development') {
    return app.use(
      ['/api', '/auth/google'],
      createProxyMiddleware({
        target: 'http://localhost:5000',
      })
    );
  }
  return app.use(['/api', '/auth/google']);
};
