var express = require("express");
var app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const exampleProxy = createProxyMiddleware({
  target: "https://id.kiotviet.vn", // the app
  changeOrigin: true,
  pathRewrite: {
    "/api/id/connect/token": "/connect/token", // rewrite path
  },
});

const exampleProxy2 = createProxyMiddleware({
  target: "https://public.kiotapi.com", // the app
  changeOrigin: true,
  pathRewrite: {
    "/api/public/products": "/products",
  },
});

const running = () => {
  app.use("/api/id", exampleProxy);
  app.use("/api/public", exampleProxy2);
  app.use(express.static(__dirname + "/"));
  app.use("/", (req, res) => {
    res.sendFile("/" + req.originalUrl + ".html", { root: __dirname });
  });

  app.listen(8080);
};

running();
