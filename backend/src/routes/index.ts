import express from 'express';
import roomRoutes from './rooms';
import guestRoutes from './guests';
import bookingRoutes from './bookings';

const router = express.Router();

// Mount routes
router.use('/rooms', roomRoutes);
router.use('/guests', guestRoutes);
router.use('/bookings', bookingRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Virtual Hotel Management API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;