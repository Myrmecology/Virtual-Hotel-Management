import express from 'express';
import { RoomController } from '../controllers/roomController';

const router = express.Router();

// GET /api/v1/rooms - Get all rooms
router.get('/', RoomController.getAllRooms);

// GET /api/v1/rooms/available - Get available rooms
router.get('/available', RoomController.getAvailableRooms);

// GET /api/v1/rooms/statistics - Get room statistics
router.get('/statistics', RoomController.getRoomStatistics);

// GET /api/v1/rooms/status/:status - Get rooms by status
router.get('/status/:status', RoomController.getRoomsByStatus);

// GET /api/v1/rooms/floor/:floor - Get rooms by floor
router.get('/floor/:floor', RoomController.getRoomsByFloor);

// GET /api/v1/rooms/:id - Get room by ID
router.get('/:id', RoomController.getRoomById);

// POST /api/v1/rooms - Create new room
router.post('/', RoomController.createRoom);

// PUT /api/v1/rooms/:id - Update room
router.put('/:id', RoomController.updateRoom);

// DELETE /api/v1/rooms/:id - Delete room
router.delete('/:id', RoomController.deleteRoom);

export default router;