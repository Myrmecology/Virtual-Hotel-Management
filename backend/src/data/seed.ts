import { database } from '../config/database';
import { RoomModel } from '../models/Room';
import { GuestModel } from '../models/Guest';
import { BookingModel } from '../models/Booking';

// Wait for database to be ready
async function waitForDatabase(maxAttempts = 10): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await database.get('SELECT 1');
      return;
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  throw new Error('Database failed to initialize');
}

async function seedDatabase() {
  console.log('🌱 Seeding database...');

  try {
    // Wait for database to be ready
    await waitForDatabase();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Extra wait for table creation

    // Clear existing data
    try {
      await database.run('DELETE FROM bookings');
      await database.run('DELETE FROM guests');
      await database.run('DELETE FROM rooms');
      console.log('✅ Cleared existing data');
    } catch (err) {
      console.log('⚠️  No existing data to clear (tables may be new)');
    }

    // Seed Rooms
    console.log('📦 Creating rooms...');
    const rooms = [
      // Floor 1
      { roomNumber: '101', floor: 1, type: 'single', pricePerNight: 80, capacity: 1, amenities: ['WiFi', 'TV'] },
      { roomNumber: '102', floor: 1, type: 'single', pricePerNight: 80, capacity: 1, amenities: ['WiFi', 'TV'] },
      { roomNumber: '103', floor: 1, type: 'double', pricePerNight: 120, capacity: 2, amenities: ['WiFi', 'TV', 'Mini Bar'] },
      { roomNumber: '104', floor: 1, type: 'double', pricePerNight: 120, capacity: 2, amenities: ['WiFi', 'TV', 'Mini Bar'] },
      
      // Floor 2
      { roomNumber: '201', floor: 2, type: 'double', pricePerNight: 130, capacity: 2, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony'] },
      { roomNumber: '202', floor: 2, type: 'suite', pricePerNight: 200, capacity: 3, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi'] },
      { roomNumber: '203', floor: 2, type: 'suite', pricePerNight: 200, capacity: 3, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi'] },
      { roomNumber: '204', floor: 2, type: 'double', pricePerNight: 130, capacity: 2, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony'] },
      
      // Floor 3
      { roomNumber: '301', floor: 3, type: 'suite', pricePerNight: 220, capacity: 3, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi', 'City View'] },
      { roomNumber: '302', floor: 3, type: 'deluxe', pricePerNight: 350, capacity: 4, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi', 'City View', 'Kitchen'] },
      { roomNumber: '303', floor: 3, type: 'deluxe', pricePerNight: 350, capacity: 4, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi', 'City View', 'Kitchen'] },
      { roomNumber: '304', floor: 3, type: 'suite', pricePerNight: 220, capacity: 3, amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi', 'City View'] },
    ];

    for (const room of rooms) {
      await RoomModel.create(room as any);
    }
    console.log(`✅ Created ${rooms.length} rooms`);

    // Seed Guests
    console.log('👥 Creating guests...');
    const guests = [
      { firstName: 'John', lastName: 'Smith', email: 'john.smith@email.com', phone: '+1-555-0101', idNumber: 'ID001', nationality: 'USA', address: '123 Main St, New York' },
      { firstName: 'Emma', lastName: 'Johnson', email: 'emma.j@email.com', phone: '+1-555-0102', idNumber: 'ID002', nationality: 'Canada', address: '456 Maple Ave, Toronto' },
      { firstName: 'Michael', lastName: 'Brown', email: 'mbrown@email.com', phone: '+1-555-0103', idNumber: 'ID003', nationality: 'UK', address: '789 Oak Rd, London' },
      { firstName: 'Sarah', lastName: 'Davis', email: 'sarah.davis@email.com', phone: '+1-555-0104', idNumber: 'ID004', nationality: 'Australia', address: '321 Beach Blvd, Sydney' },
      { firstName: 'David', lastName: 'Wilson', email: 'dwilson@email.com', phone: '+1-555-0105', idNumber: 'ID005', nationality: 'USA', address: '654 Pine St, Los Angeles' },
      { firstName: 'Lisa', lastName: 'Martinez', email: 'lisa.m@email.com', phone: '+1-555-0106', idNumber: 'ID006', nationality: 'Spain', address: '987 Elm Dr, Madrid' },
    ];

    for (const guest of guests) {
      await GuestModel.create(guest as any);
    }
    console.log(`✅ Created ${guests.length} guests`);

    // Seed Bookings
    console.log('📅 Creating bookings...');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const bookings = [
      // Current bookings (checked-in)
      { guestId: 1, roomId: 3, checkInDate: lastWeek.toISOString().split('T')[0], checkOutDate: tomorrow.toISOString().split('T')[0], specialRequests: 'Late checkout if possible' },
      { guestId: 2, roomId: 6, checkInDate: lastWeek.toISOString().split('T')[0], checkOutDate: nextWeek.toISOString().split('T')[0], specialRequests: 'Extra pillows' },
      
      // Today's check-ins
      { guestId: 3, roomId: 1, checkInDate: today.toISOString().split('T')[0], checkOutDate: nextWeek.toISOString().split('T')[0], specialRequests: null },
      { guestId: 4, roomId: 5, checkInDate: today.toISOString().split('T')[0], checkOutDate: nextWeek.toISOString().split('T')[0], specialRequests: 'Quiet room please' },
      
      // Upcoming bookings
      { guestId: 5, roomId: 10, checkInDate: tomorrow.toISOString().split('T')[0], checkOutDate: nextWeek.toISOString().split('T')[0], specialRequests: 'High floor' },
      { guestId: 6, roomId: 11, checkInDate: tomorrow.toISOString().split('T')[0], checkOutDate: nextWeek.toISOString().split('T')[0], specialRequests: null },
    ];

    for (const booking of bookings) {
      await BookingModel.create(booking as any);
    }

    // Update booking statuses
    await database.run('UPDATE bookings SET status = "checked-in" WHERE id IN (1, 2)');
    await database.run('UPDATE bookings SET status = "confirmed" WHERE id IN (3, 4, 5, 6)');
    
    // Update room statuses
    await database.run('UPDATE rooms SET status = "occupied" WHERE id IN (3, 6)');
    await database.run('UPDATE rooms SET status = "cleaning" WHERE id IN (2, 4)');

    console.log(`✅ Created ${bookings.length} bookings`);

    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ Database seeded successfully!');
    console.log('═══════════════════════════════════════════════════');
    console.log(`📊 Summary:`);
    console.log(`   - ${rooms.length} rooms created`);
    console.log(`   - ${guests.length} guests created`);
    console.log(`   - ${bookings.length} bookings created`);
    console.log('═══════════════════════════════════════════════════');
    console.log('');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      database.close();
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      database.close();
      process.exit(1);
    });
}

export { seedDatabase };