import { Request, Response } from 'express';
import { RoomModel } from '../models/Room';
import { CreateRoomRequest, UpdateRoomRequest } from '../types';

export class RoomController {
  // Get all rooms
  static async getAllRooms(req: Request, res: Response): Promise<void> {
    try {
      const rooms = await RoomModel.findAll();
      res.json({
        success: true,
        data: rooms,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get room by ID
  static async getRoomById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const room = await RoomModel.findById(parseInt(id));
      res.json({
        success: true,
        data: room,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get rooms by status
  static async getRoomsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const rooms = await RoomModel.findByStatus(status);
      res.json({
        success: true,
        data: rooms,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get rooms by floor
  static async getRoomsByFloor(req: Request, res: Response): Promise<void> {
    try {
      const { floor } = req.params;
      const rooms = await RoomModel.findByFloor(parseInt(floor));
      res.json({
        success: true,
        data: rooms,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get available rooms
  static async getAvailableRooms(req: Request, res: Response): Promise<void> {
    try {
      const rooms = await RoomModel.getAvailableRooms();
      res.json({
        success: true,
        data: rooms,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Create new room
  static async createRoom(req: Request, res: Response): Promise<void> {
    try {
      const roomData: CreateRoomRequest = req.body;
      const room = await RoomModel.create(roomData);
      res.status(201).json({
        success: true,
        data: room,
        message: 'Room created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Update room
  static async updateRoom(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateRoomRequest = req.body;
      const room = await RoomModel.update(parseInt(id), updates);
      res.json({
        success: true,
        data: room,
        message: 'Room updated successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Delete room
  static async deleteRoom(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await RoomModel.delete(parseInt(id));
      res.json({
        success: true,
        message: 'Room deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get room statistics
  static async getRoomStatistics(req: Request, res: Response): Promise<void> {
    try {
      const stats = await RoomModel.getStatistics();
      res.json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}