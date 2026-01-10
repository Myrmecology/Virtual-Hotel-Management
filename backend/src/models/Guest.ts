import { database } from '../config/database';
import { Guest, CreateGuestRequest, UpdateGuestRequest } from '../types';

export class GuestModel {
  // Create a new guest
  static async create(guestData: CreateGuestRequest): Promise<Guest> {
    const { firstName, lastName, email, phone, address, idNumber, nationality } = guestData;
    
    const sql = `
      INSERT INTO guests (firstName, lastName, email, phone, address, idNumber, nationality)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await database.run(sql, [
      firstName,
      lastName,
      email,
      phone,
      address || null,
      idNumber,
      nationality || null,
    ]);
    
    return this.findById(result.lastID!);
  }

  // Find guest by ID
  static async findById(id: number): Promise<Guest> {
    const sql = 'SELECT * FROM guests WHERE id = ?';
    const guest = await database.get(sql, [id]);
    
    if (!guest) {
      throw new Error(`Guest with ID ${id} not found`);
    }
    
    return guest;
  }

  // Find all guests
  static async findAll(): Promise<Guest[]> {
    const sql = 'SELECT * FROM guests ORDER BY lastName, firstName';
    return database.all(sql);
  }

  // Find guest by email
  static async findByEmail(email: string): Promise<Guest | null> {
    const sql = 'SELECT * FROM guests WHERE email = ?';
    return database.get(sql, [email]);
  }

  // Find guest by ID number
  static async findByIdNumber(idNumber: string): Promise<Guest | null> {
    const sql = 'SELECT * FROM guests WHERE idNumber = ?';
    return database.get(sql, [idNumber]);
  }

  // Search guests by name
  static async searchByName(searchTerm: string): Promise<Guest[]> {
    const sql = `
      SELECT * FROM guests 
      WHERE firstName LIKE ? OR lastName LIKE ?
      ORDER BY lastName, firstName
    `;
    const term = `%${searchTerm}%`;
    return database.all(sql, [term, term]);
  }

  // Update guest
  static async update(id: number, updates: UpdateGuestRequest): Promise<Guest> {
    const guest = await this.findById(id);
    
    const fields: string[] = [];
    const values: any[] = [];
    
    if (updates.firstName !== undefined) {
      fields.push('firstName = ?');
      values.push(updates.firstName);
    }
    if (updates.lastName !== undefined) {
      fields.push('lastName = ?');
      values.push(updates.lastName);
    }
    if (updates.email !== undefined) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.phone !== undefined) {
      fields.push('phone = ?');
      values.push(updates.phone);
    }
    if (updates.address !== undefined) {
      fields.push('address = ?');
      values.push(updates.address);
    }
    if (updates.nationality !== undefined) {
      fields.push('nationality = ?');
      values.push(updates.nationality);
    }
    
    if (fields.length === 0) {
      return guest;
    }
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const sql = `UPDATE guests SET ${fields.join(', ')} WHERE id = ?`;
    await database.run(sql, values);
    
    return this.findById(id);
  }

  // Delete guest
  static async delete(id: number): Promise<void> {
    const sql = 'DELETE FROM guests WHERE id = ?';
    await database.run(sql, [id]);
  }

  // Get guest statistics
  static async getStatistics(): Promise<{
    total: number;
    withBookings: number;
  }> {
    const totalSql = 'SELECT COUNT(*) as total FROM guests';
    const withBookingsSql = `
      SELECT COUNT(DISTINCT guestId) as withBookings 
      FROM bookings
    `;
    
    const total = await database.get(totalSql);
    const withBookings = await database.get(withBookingsSql);
    
    return {
      total: total.total,
      withBookings: withBookings.withBookings,
    };
  }

  // Get guest with their booking history
  static async getGuestWithBookings(id: number): Promise<any> {
    const guest = await this.findById(id);
    
    const bookingsSql = `
      SELECT b.*, r.roomNumber, r.type as roomType
      FROM bookings b
      JOIN rooms r ON b.roomId = r.id
      WHERE b.guestId = ?
      ORDER BY b.checkInDate DESC
    `;
    
    const bookings = await database.all(bookingsSql, [id]);
    
    return {
      ...guest,
      bookings,
    };
  }
}