import { database } from '../config/database';
import { Room, CreateRoomRequest, UpdateRoomRequest } from '../types';

export class RoomModel {
  // Create a new room
  static async create(roomData: CreateRoomRequest): Promise<Room> {
    const { roomNumber, floor, type, pricePerNight, capacity, amenities = [] } = roomData;
    
    const amenitiesJson = JSON.stringify(amenities);
    
    const sql = `
      INSERT INTO rooms (roomNumber, floor, type, pricePerNight, capacity, amenities)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await database.run(sql, [
      roomNumber,
      floor,
      type,
      pricePerNight,
      capacity,
      amenitiesJson,
    ]);
    
    return this.findById(result.lastID!);
  }

  // Find room by ID
  static async findById(id: number): Promise<Room> {
    const sql = 'SELECT * FROM rooms WHERE id = ?';
    const room = await database.get(sql, [id]);
    
    if (!room) {
      throw new Error(`Room with ID ${id} not found`);
    }
    
    return this.parseRoom(room);
  }

  // Find all rooms
  static async findAll(): Promise<Room[]> {
    const sql = 'SELECT * FROM rooms ORDER BY floor, roomNumber';
    const rooms = await database.all(sql);
    return rooms.map(this.parseRoom);
  }

  // Find rooms by status
  static async findByStatus(status: string): Promise<Room[]> {
    const sql = 'SELECT * FROM rooms WHERE status = ? ORDER BY floor, roomNumber';
    const rooms = await database.all(sql, [status]);
    return rooms.map(this.parseRoom);
  }

  // Find rooms by floor
  static async findByFloor(floor: number): Promise<Room[]> {
    const sql = 'SELECT * FROM rooms WHERE floor = ? ORDER BY roomNumber';
    const rooms = await database.all(sql, [floor]);
    return rooms.map(this.parseRoom);
  }

  // Update room
  static async update(id: number, updates: UpdateRoomRequest): Promise<Room> {
    const room = await this.findById(id);
    
    const fields: string[] = [];
    const values: any[] = [];
    
    if (updates.roomNumber !== undefined) {
      fields.push('roomNumber = ?');
      values.push(updates.roomNumber);
    }
    if (updates.floor !== undefined) {
      fields.push('floor = ?');
      values.push(updates.floor);
    }
    if (updates.type !== undefined) {
      fields.push('type = ?');
      values.push(updates.type);
    }
    if (updates.status !== undefined) {
      fields.push('status = ?');
      values.push(updates.status);
    }
    if (updates.pricePerNight !== undefined) {
      fields.push('pricePerNight = ?');
      values.push(updates.pricePerNight);
    }
    if (updates.capacity !== undefined) {
      fields.push('capacity = ?');
      values.push(updates.capacity);
    }
    if (updates.amenities !== undefined) {
      fields.push('amenities = ?');
      values.push(JSON.stringify(updates.amenities));
    }
    
    if (fields.length === 0) {
      return room;
    }
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const sql = `UPDATE rooms SET ${fields.join(', ')} WHERE id = ?`;
    await database.run(sql, values);
    
    return this.findById(id);
  }

  // Delete room
  static async delete(id: number): Promise<void> {
    const sql = 'DELETE FROM rooms WHERE id = ?';
    await database.run(sql, [id]);
  }

  // Get available rooms
  static async getAvailableRooms(): Promise<Room[]> {
    return this.findByStatus('vacant');
  }

  // Get room statistics
  static async getStatistics(): Promise<{
    total: number;
    vacant: number;
    occupied: number;
    cleaning: number;
    maintenance: number;
  }> {
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'vacant' THEN 1 ELSE 0 END) as vacant,
        SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) as occupied,
        SUM(CASE WHEN status = 'cleaning' THEN 1 ELSE 0 END) as cleaning,
        SUM(CASE WHEN status = 'maintenance' THEN 1 ELSE 0 END) as maintenance
      FROM rooms
    `;
    
    return database.get(sql);
  }

  // Helper method to parse room data
  private static parseRoom(row: any): Room {
    return {
      ...row,
      amenities: row.amenities ? JSON.parse(row.amenities) : [],
    };
  }
}