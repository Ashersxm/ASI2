const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();

// Proxy vers Spring Boot
app.use(
    '/api/v1/images',
    createProxyMiddleware({
        target: 'http://localhost:8081', // Spring Boot
        changeOrigin: true,
    })
);

// Proxy vers Node.js
app.use(
    '/game',
    createProxyMiddleware({
        target: 'http://localhost:9783', // Node.js
        changeOrigin: true,
    })
);

// Lancer le serveur proxy
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
