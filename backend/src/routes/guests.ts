import express from 'express';
import { GuestController } from '../controllers/guestController';

const router = express.Router();

// GET /api/v1/guests - Get all guests
router.get('/', GuestController.getAllGuests);

// GET /api/v1/guests/search - Search guests by name
router.get('/search', GuestController.searchGuests);

// GET /api/v1/guests/statistics - Get guest statistics
router.get('/statistics', GuestController.getGuestStatistics);

// GET /api/v1/guests/:id - Get guest by ID
router.get('/:id', GuestController.getGuestById);

// GET /api/v1/guests/:id/bookings - Get guest with booking history
router.get('/:id/bookings', GuestController.getGuestWithBookings);

// POST /api/v1/guests - Create new guest
router.post('/', GuestController.createGuest);

// PUT /api/v1/guests/:id - Update guest
router.put('/:id', GuestController.updateGuest);

// DELETE /api/v1/guests/:id - Delete guest
router.delete('/:id', GuestController.deleteGuest);

export default router;