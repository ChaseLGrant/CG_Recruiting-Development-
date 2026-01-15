import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/environment';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import packagesRouter from './routes/packages';
import paymentsRouter from './routes/payments';
import webhooksRouter from './routes/webhooks';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

// Webhook route needs raw body for signature verification
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// JSON body parser for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/packages', packagesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/webhooks', webhooksRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(env.PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║  CG Recruiting API Server                 ║
║  Environment: ${env.NODE_ENV.padEnd(28)} ║
║  Port: ${env.PORT.toString().padEnd(35)} ║
║  Frontend URL: ${env.FRONTEND_URL.padEnd(26)} ║
╚═══════════════════════════════════════════╝
  `);
  console.log('Server is running and ready to accept requests');
});

export default app;
