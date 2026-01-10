import { Request, Response } from 'express';
import { BookingModel } from '../models/Booking';
import { CreateBookingRequest, UpdateBookingRequest } from '../types';

export class BookingController {
  // Get all bookings
  static async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await BookingModel.findAll();
      res.json({
        success: true,
        data: bookings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get booking by ID
  static async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await BookingModel.findById(parseInt(id));
      res.json({
        success: true,
        data: booking,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get booking by ID with details
  static async getBookingWithDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await BookingModel.findByIdWithDetails(parseInt(id));
      res.json({
        success: true,
        data: booking,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get bookings by status
  static async getBookingsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const bookings = await BookingModel.findByStatus(status);
      res.json({
        success: true,
        data: bookings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get bookings by guest ID
  static async getBookingsByGuest(req: Request, res: Response): Promise<void> {
    try {
      const { guestId } = req.params;
      const bookings = await BookingModel.findByGuestId(parseInt(guestId));
      res.json({
        success: true,
        data: bookings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get bookings by room ID
  static async getBookingsByRoom(req: Request, res: Response): Promise<void> {
    try {
      const { roomId } = req.params;
      const bookings = await BookingModel.findByRoomId(parseInt(roomId));
      res.json({
        success: true,
        data: bookings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get today's check-ins
  static async getTodayCheckIns(req: Request, res: Response): Promise<void> {
    try {
      const checkIns = await BookingModel.getTodayCheckIns();
      res.json({
        success: true,
        data: checkIns,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get today's check-outs
  static async getTodayCheckOuts(req: Request, res: Response): Promise<void> {
    try {
      const checkOuts = await BookingModel.getTodayCheckOuts();
      res.json({
        success: true,
        data: checkOuts,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Create new booking
  static async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const bookingData: CreateBookingRequest = req.body;
      
      // Validate dates
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      
      if (checkOut <= checkIn) {
        res.status(400).json({
          success: false,
          error: 'Check-out date must be after check-in date',
        });
        return;
      }
      
      const booking = await BookingModel.create(bookingData);
      res.status(201).json({
        success: true,
        data: booking,
        message: 'Booking created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Update booking
  static async updateBooking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateBookingRequest = req.body;
      
      // Validate dates if both are being updated
      if (updates.checkInDate && updates.checkOutDate) {
        const checkIn = new Date(updates.checkInDate);
        const checkOut = new Date(updates.checkOutDate);
        
        if (checkOut <= checkIn) {
          res.status(400).json({
            success: false,
            error: 'Check-out date must be after check-in date',
          });
          return;
        }
      }
      
      const booking = await BookingModel.update(parseInt(id), updates);
      res.json({
        success: true,
        data: booking,
        message: 'Booking updated successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Delete booking
  static async deleteBooking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await BookingModel.delete(parseInt(id));
      res.json({
        success: true,
        message: 'Booking deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get booking statistics
  static async getBookingStatistics(req: Request, res: Response): Promise<void> {
    try {
      const stats = await BookingModel.getStatistics();
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