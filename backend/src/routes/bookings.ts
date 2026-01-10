import express from 'express';
import { BookingController } from '../controllers/bookingController';

const router = express.Router();

// GET /api/v1/bookings - Get all bookings
router.get('/', BookingController.getAllBookings);

// GET /api/v1/bookings/today/check-ins - Get today's check-ins
router.get('/today/check-ins', BookingController.getTodayCheckIns);

// GET /api/v1/bookings/today/check-outs - Get today's check-outs
router.get('/today/check-outs', BookingController.getTodayCheckOuts);

// GET /api/v1/bookings/statistics - Get booking statistics
router.get('/statistics', BookingController.getBookingStatistics);

// GET /api/v1/bookings/status/:status - Get bookings by status
router.get('/status/:status', BookingController.getBookingsByStatus);

// GET /api/v1/bookings/guest/:guestId - Get bookings by guest
router.get('/guest/:guestId', BookingController.getBookingsByGuest);

// GET /api/v1/bookings/room/:roomId - Get bookings by room
router.get('/room/:roomId', BookingController.getBookingsByRoom);

// GET /api/v1/bookings/:id - Get booking by ID
router.get('/:id', BookingController.getBookingById);

// GET /api/v1/bookings/:id/details - Get booking with full details
router.get('/:id/details', BookingController.getBookingWithDetails);

// POST /api/v1/bookings - Create new booking
router.post('/', BookingController.createBooking);

// PUT /api/v1/bookings/:id - Update booking
router.put('/:id', BookingController.updateBooking);

// DELETE /api/v1/bookings/:id - Delete booking
router.delete('/:id', BookingController.deleteBooking);

export default router;