import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config({ path: '../.env' });

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API routes
const apiPrefix = process.env.API_PREFIX || '/api/v1';
app.use(apiPrefix, routes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Virtual Hotel Management API',
    version: '1.0.0',
    endpoints: {
      health: `${apiPrefix}/health`,
      rooms: `${apiPrefix}/rooms`,
      guests: `${apiPrefix}/guests`,
      bookings: `${apiPrefix}/bookings`,
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;