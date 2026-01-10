// ============================================
// VIRTUAL HOTEL MANAGEMENT - BACKEND TYPES
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

// Extended types with relations
export interface BookingWithDetails extends Booking {
  guest: Guest;
  room: Room;
}

export interface RoomWithBooking extends Room {
  currentBooking?: Booking;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request body types
export interface CreateRoomRequest {
  roomNumber: string;
  floor: number;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  pricePerNight: number;
  capacity: number;
  amenities?: string[];
}

export interface UpdateRoomRequest {
  roomNumber?: string;
  floor?: number;
  type?: 'single' | 'double' | 'suite' | 'deluxe';
  status?: 'vacant' | 'occupied' | 'cleaning' | 'maintenance';
  pricePerNight?: number;
  capacity?: number;
  amenities?: string[];
}

export interface CreateGuestRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  idNumber: string;
  nationality?: string;
}

export interface UpdateGuestRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  nationality?: string;
}

export interface CreateBookingRequest {
  guestId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

export interface UpdateBookingRequest {
  checkInDate?: string;
  checkOutDate?: string;
  status?: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus?: 'unpaid' | 'partial' | 'paid' | 'refunded';
  specialRequests?: string;
}

// Database query options
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}