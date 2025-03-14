// import express, { Request, Response, NextFunction } from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// import { morganLogger, winstonLogger } from './utils/logger';
// import router from './router';
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(helmet());
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100    
// });
// app.use(limiter);


// app.use(morganLogger);


// app.use('/api', router);


// app.get('/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   winstonLogger.error('Error:', err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// app.listen(PORT, () => {
//   winstonLogger.info(`API Gateway is running on port ${PORT}`);
// }); 


    // index.ts
    import express from 'express';
    import router from './router';

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Use the router under the '/api' prefix
    app.use('/api', router);

    app.listen(PORT, () => {
      console.log(`API Gateway running on port ${PORT}`);
    });
    