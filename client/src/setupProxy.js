const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ivan-chkalov-cv.onrender.com/api",
      changeOrigin: true,
    })
  );
};
