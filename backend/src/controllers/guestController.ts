import { Request, Response } from 'express';
import { GuestModel } from '../models/Guest';
import { CreateGuestRequest, UpdateGuestRequest } from '../types';

export class GuestController {
  // Get all guests
  static async getAllGuests(req: Request, res: Response): Promise<void> {
    try {
      const guests = await GuestModel.findAll();
      res.json({
        success: true,
        data: guests,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get guest by ID
  static async getGuestById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const guest = await GuestModel.findById(parseInt(id));
      res.json({
        success: true,
        data: guest,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get guest with booking history
  static async getGuestWithBookings(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const guestData = await GuestModel.getGuestWithBookings(parseInt(id));
      res.json({
        success: true,
        data: guestData,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Search guests by name
  static async searchGuests(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Search query is required',
        });
        return;
      }
      
      const guests = await GuestModel.searchByName(query);
      res.json({
        success: true,
        data: guests,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Create new guest
  static async createGuest(req: Request, res: Response): Promise<void> {
    try {
      const guestData: CreateGuestRequest = req.body;
      
      // Check if email already exists
      const existingEmail = await GuestModel.findByEmail(guestData.email);
      if (existingEmail) {
        res.status(400).json({
          success: false,
          error: 'Guest with this email already exists',
        });
        return;
      }
      
      // Check if ID number already exists
      const existingId = await GuestModel.findByIdNumber(guestData.idNumber);
      if (existingId) {
        res.status(400).json({
          success: false,
          error: 'Guest with this ID number already exists',
        });
        return;
      }
      
      const guest = await GuestModel.create(guestData);
      res.status(201).json({
        success: true,
        data: guest,
        message: 'Guest created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Update guest
  static async updateGuest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateGuestRequest = req.body;
      
      // If email is being updated, check it doesn't already exist
      if (updates.email) {
        const existing = await GuestModel.findByEmail(updates.email);
        if (existing && existing.id !== parseInt(id)) {
          res.status(400).json({
            success: false,
            error: 'Guest with this email already exists',
          });
          return;
        }
      }
      
      const guest = await GuestModel.update(parseInt(id), updates);
      res.json({
        success: true,
        data: guest,
        message: 'Guest updated successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Delete guest
  static async deleteGuest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await GuestModel.delete(parseInt(id));
      res.json({
        success: true,
        message: 'Guest deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get guest statistics
  static async getGuestStatistics(req: Request, res: Response): Promise<void> {
    try {
      const stats = await GuestModel.getStatistics();
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