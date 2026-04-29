const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  let target = '';
  if (req.url.startsWith('/v1')) {
    target = 'https://generativelanguage.googleapis.com';
  }

  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/': '/',
    },
  })(req, res);
};
