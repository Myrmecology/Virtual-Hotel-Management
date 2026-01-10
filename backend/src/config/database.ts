import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

// Enable verbose mode for better debugging
const sqlite = sqlite3.verbose();

class Database {
  private db: sqlite3.Database | null = null;

  constructor() {
    this.connect();
  }

  private connect(): void {
    const dbPath = process.env.DATABASE_PATH || './data/hotel.db';
    const dbDir = path.dirname(dbPath);

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    this.db = new sqlite.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
      }
      console.log('✅ Connected to SQLite database');
      this.initializeTables();
    });
  }

  private initializeTables(): void {
    if (!this.db) return;

    const tables = [
      // Rooms table
      `CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roomNumber TEXT UNIQUE NOT NULL,
        floor INTEGER NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('single', 'double', 'suite', 'deluxe')),
        status TEXT NOT NULL DEFAULT 'vacant' CHECK(status IN ('vacant', 'occupied', 'cleaning', 'maintenance')),
        pricePerNight REAL NOT NULL,
        capacity INTEGER NOT NULL,
        amenities TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,

      // Guests table
      `CREATE TABLE IF NOT EXISTS guests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        address TEXT,
        idNumber TEXT UNIQUE NOT NULL,
        nationality TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,

      // Bookings table
      `CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guestId INTEGER NOT NULL,
        roomId INTEGER NOT NULL,
        checkInDate TEXT NOT NULL,
        checkOutDate TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled')),
        totalAmount REAL NOT NULL,
        paymentStatus TEXT NOT NULL DEFAULT 'unpaid' CHECK(paymentStatus IN ('unpaid', 'partial', 'paid', 'refunded')),
        specialRequests TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guestId) REFERENCES guests(id) ON DELETE CASCADE,
        FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE
      )`,

      // Create indexes for better query performance
      `CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status)`,
      `CREATE INDEX IF NOT EXISTS idx_rooms_floor ON rooms(floor)`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(checkInDate, checkOutDate)`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`,
    ];

    tables.forEach((sql) => {
      this.db!.run(sql, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        }
      });
    });

    console.log('✅ Database tables initialized');
  }

  public getDb(): sqlite3.Database {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  // Promisified query methods
  public run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db!.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  public get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db!.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  public all(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db!.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }
      this.db.close((err) => {
        if (err) reject(err);
        else {
          console.log('Database connection closed');
          resolve();
        }
      });
    });
  }
}

// Export singleton instance
export const database = new Database();