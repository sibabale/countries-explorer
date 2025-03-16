import dotenv from 'dotenv';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const router = express.Router();

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3100';
const countryServiceUrl = process.env.COUNTRY_SERVICE_URL || 'http://localhost:3200';

router.use('/auth', createProxyMiddleware({
    target: authServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/' }  }));

    router.use('/countries', createProxyMiddleware({
      target: countryServiceUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/$': '/api/countries',
        '^/(.*)': '/api/countries/$1',
      },
    }));

export default router;
