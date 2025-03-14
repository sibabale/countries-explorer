import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

const authServiceUrl = 'http://localhost:3100';
const countryServiceUrl = 'http://localhost:3200';

router.use('/auth', createProxyMiddleware({
    target: authServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/' }  }));

router.use('/countries', createProxyMiddleware({
  target: countryServiceUrl,
  changeOrigin: true,
  pathRewrite: { '^/countries': '' },
}));

export default router;
