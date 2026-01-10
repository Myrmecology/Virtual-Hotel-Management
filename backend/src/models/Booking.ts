import { database } from '../config/database';
import { Booking, BookingWithDetails, CreateBookingRequest, UpdateBookingRequest } from '../types';

export class BookingModel {
  // Create a new booking
  static async create(bookingData: CreateBookingRequest): Promise<Booking> {
    const { guestId, roomId, checkInDate, checkOutDate, specialRequests } = bookingData;
    
    // Get room price
    const room = await database.get('SELECT pricePerNight FROM rooms WHERE id = ?', [roomId]);
    if (!room) {
      throw new Error(`Room with ID ${roomId} not found`);
    }
    
    // Calculate total amount (days * price)
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = days * room.pricePerNight;
    
    const sql = `
      INSERT INTO bookings (guestId, roomId, checkInDate, checkOutDate, totalAmount, specialRequests)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await database.run(sql, [
      guestId,
      roomId,
      checkInDate,
      checkOutDate,
      totalAmount,
      specialRequests || null,
    ]);
    
    return this.findById(result.lastID!);
  }

  // Find booking by ID
  static async findById(id: number): Promise<Booking> {
    const sql = 'SELECT * FROM bookings WHERE id = ?';
    const booking = await database.get(sql, [id]);
    
    if (!booking) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    
    return booking;
  }

  // Find all bookings
  static async findAll(): Promise<Booking[]> {
    const sql = 'SELECT * FROM bookings ORDER BY checkInDate DESC';
    return database.all(sql);
  }

  // Find booking with guest and room details
  static async findByIdWithDetails(id: number): Promise<BookingWithDetails> {
    const sql = `
      SELECT 
        b.*,
        g.firstName, g.lastName, g.email, g.phone, g.address, g.idNumber, g.nationality,
        r.roomNumber, r.floor, r.type, r.pricePerNight, r.capacity, r.amenities
      FROM bookings b
      JOIN guests g ON b.guestId = g.id
      JOIN rooms r ON b.roomId = r.id
      WHERE b.id = ?
    `;
    
    const result = await database.get(sql, [id]);
    
    if (!result) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    
    return {
      id: result.id,
      guestId: result.guestId,
      roomId: result.roomId,
      checkInDate: result.checkInDate,
      checkOutDate: result.checkOutDate,
      status: result.status,
      totalAmount: result.totalAmount,
      paymentStatus: result.paymentStatus,
      specialRequests: result.specialRequests,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      guest: {
        id: result.guestId,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phone: result.phone,
        address: result.address,
        idNumber: result.idNumber,
        nationality: result.nationality,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
      room: {
        id: result.roomId,
        roomNumber: result.roomNumber,
        floor: result.floor,
        type: result.type,
        status: 'occupied',
        pricePerNight: result.pricePerNight,
        capacity: result.capacity,
        amenities: result.amenities ? JSON.parse(result.amenities) : [],
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    };
  }

  // Find bookings by status
  static async findByStatus(status: string): Promise<Booking[]> {
    const sql = 'SELECT * FROM bookings WHERE status = ? ORDER BY checkInDate DESC';
    return database.all(sql, [status]);
  }

  // Find bookings by guest ID
  static async findByGuestId(guestId: number): Promise<Booking[]> {
    const sql = 'SELECT * FROM bookings WHERE guestId = ? ORDER BY checkInDate DESC';
    return database.all(sql, [guestId]);
  }

  // Find bookings by room ID
  static async findByRoomId(roomId: number): Promise<Booking[]> {
    const sql = 'SELECT * FROM bookings WHERE roomId = ? ORDER BY checkInDate DESC';
    return database.all(sql, [roomId]);
  }

  // Get today's check-ins
  static async getTodayCheckIns(): Promise<BookingWithDetails[]> {
    const today = new Date().toISOString().split('T')[0];
    const sql = `
      SELECT 
        b.*,
        g.firstName, g.lastName, g.email, g.phone,
        r.roomNumber, r.type
      FROM bookings b
      JOIN guests g ON b.guestId = g.id
      JOIN rooms r ON b.roomId = r.id
      WHERE DATE(b.checkInDate) = ? AND b.status IN ('confirmed', 'pending')
      ORDER BY b.checkInDate
    `;
    
    return database.all(sql, [today]);
  }

  // Get today's check-outs
  static async getTodayCheckOuts(): Promise<BookingWithDetails[]> {
    const today = new Date().toISOString().split('T')[0];
    const sql = `
      SELECT 
        b.*,
        g.firstName, g.lastName, g.email, g.phone,
        r.roomNumber, r.type
      FROM bookings b
      JOIN guests g ON b.guestId = g.id
      JOIN rooms r ON b.roomId = r.id
      WHERE DATE(b.checkOutDate) = ? AND b.status = 'checked-in'
      ORDER BY b.checkOutDate
    `;
    
    return database.all(sql, [today]);
  }

  // Update booking
  static async update(id: number, updates: UpdateBookingRequest): Promise<Booking> {
    const booking = await this.findById(id);
    
    const fields: string[] = [];
    const values: any[] = [];
    
    if (updates.checkInDate !== undefined) {
      fields.push('checkInDate = ?');
      values.push(updates.checkInDate);
    }
    if (updates.checkOutDate !== undefined) {
      fields.push('checkOutDate = ?');
      values.push(updates.checkOutDate);
    }
    if (updates.status !== undefined) {
      fields.push('status = ?');
      values.push(updates.status);
    }
    if (updates.paymentStatus !== undefined) {
      fields.push('paymentStatus = ?');
      values.push(updates.paymentStatus);
    }
    if (updates.specialRequests !== undefined) {
      fields.push('specialRequests = ?');
      values.push(updates.specialRequests);
    }
    
    if (fields.length === 0) {
      return booking;
    }
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const sql = `UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`;
    await database.run(sql, values);
    
    return this.findById(id);
  }

  // Delete booking
  static async delete(id: number): Promise<void> {
    const sql = 'DELETE FROM bookings WHERE id = ?';
    await database.run(sql, [id]);
  }

  // Get booking statistics
  static async getStatistics(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    checkedIn: number;
    checkedOut: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'checked-in' THEN 1 ELSE 0 END) as checkedIn,
        SUM(CASE WHEN status = 'checked-out' THEN 1 ELSE 0 END) as checkedOut,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN paymentStatus = 'paid' THEN totalAmount ELSE 0 END) as totalRevenue
      FROM bookings
    `;
    
    return database.get(sql);
  }
}