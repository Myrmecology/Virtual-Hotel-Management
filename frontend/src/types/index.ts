// ============================================
// VIRTUAL HOTEL MANAGEMENT - FRONTEND TYPES
// ============================================

export interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  status: 'vacant' | 'occupied' | 'cleaning' | 'maintenance';
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  idNumber: string;
  nationality?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  guestId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithDetails extends Booking {
  guest: Guest;
  room: Room;
}

export interface RoomWithBooking extends Room {
  currentBooking?: Booking;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  checkInsToday: number;
  checkOutsToday: number;
  totalRevenue: number;
  occupancyRate: number;
}

export interface HotelFloor {
  floor: number;
  rooms: Room[];
}