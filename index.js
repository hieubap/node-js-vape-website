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
    "/api/public/products/code": "/products/code",
    "/api/public/orders": "/orders",
  },
});

const running = () => {
  app.use("/api/id", exampleProxy);
  app.use("/api/public", exampleProxy2);
  app.use(express.static(__dirname + "/"));

  app.use("/product", (req, res) => {
    res.sendFile("/product.html", { root: __dirname });
  });
  app.use("/checkout", (req, res) => {
    res.sendFile("/checkout.html", { root: __dirname });
  });
  app.use("/cart", (req, res) => {
    res.sendFile("/cart.html", { root: __dirname });
  });
  app.use("/bill", (req, res) => {
    res.sendFile("/bill.html", { root: __dirname });
  });
  app.use("/van-chuyen", (req, res) => {
    res.sendFile("/van-chuyen.html", { root: __dirname });
  });
  app.use("/phuong-thuc-thanh-toan", (req, res) => {
    res.sendFile("/phuong-thuc-thanh-toan.html", { root: __dirname });
  });
  app.use("/", (req, res) => {
    res.sendFile("/clone.html", { root: __dirname });
  });

  app.listen(8070);
};

running();
