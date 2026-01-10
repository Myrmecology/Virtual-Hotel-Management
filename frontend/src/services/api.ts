import axios, { AxiosInstance, AxiosError } from 'axios';
import { Room, Guest, Booking, ApiResponse, DashboardStats } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// ROOM API
// ============================================

export const roomAPI = {
  getAll: async (): Promise<Room[]> => {
    const response = await api.get<ApiResponse<Room[]>>('/rooms');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Room> => {
    const response = await api.get<ApiResponse<Room>>(`/rooms/${id}`);
    return response.data.data!;
  },

  getByStatus: async (status: string): Promise<Room[]> => {
    const response = await api.get<ApiResponse<Room[]>>(`/rooms/status/${status}`);
    return response.data.data || [];
  },

  getByFloor: async (floor: number): Promise<Room[]> => {
    const response = await api.get<ApiResponse<Room[]>>(`/rooms/floor/${floor}`);
    return response.data.data || [];
  },

  getAvailable: async (): Promise<Room[]> => {
    const response = await api.get<ApiResponse<Room[]>>('/rooms/available');
    return response.data.data || [];
  },

  getStatistics: async (): Promise<any> => {
    const response = await api.get<ApiResponse<any>>('/rooms/statistics');
    return response.data.data;
  },

  create: async (roomData: any): Promise<Room> => {
    const response = await api.post<ApiResponse<Room>>('/rooms', roomData);
    return response.data.data!;
  },

  update: async (id: number, updates: any): Promise<Room> => {
    const response = await api.put<ApiResponse<Room>>(`/rooms/${id}`, updates);
    return response.data.data!;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/rooms/${id}`);
  },
};

// ============================================
// GUEST API
// ============================================

export const guestAPI = {
  getAll: async (): Promise<Guest[]> => {
    const response = await api.get<ApiResponse<Guest[]>>('/guests');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Guest> => {
    const response = await api.get<ApiResponse<Guest>>(`/guests/${id}`);
    return response.data.data!;
  },

  getWithBookings: async (id: number): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/guests/${id}/bookings`);
    return response.data.data;
  },

  search: async (query: string): Promise<Guest[]> => {
    const response = await api.get<ApiResponse<Guest[]>>('/guests/search', {
      params: { query },
    });
    return response.data.data || [];
  },

  getStatistics: async (): Promise<any> => {
    const response = await api.get<ApiResponse<any>>('/guests/statistics');
    return response.data.data;
  },

  create: async (guestData: any): Promise<Guest> => {
    const response = await api.post<ApiResponse<Guest>>('/guests', guestData);
    return response.data.data!;
  },

  update: async (id: number, updates: any): Promise<Guest> => {
    const response = await api.put<ApiResponse<Guest>>(`/guests/${id}`, updates);
    return response.data.data!;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/guests/${id}`);
  },
};

// ============================================
// BOOKING API
// ============================================

export const bookingAPI = {
  getAll: async (): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>('/bookings');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Booking> => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data.data!;
  },

  getWithDetails: async (id: number): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/bookings/${id}/details`);
    return response.data.data;
  },

  getByStatus: async (status: string): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>(`/bookings/status/${status}`);
    return response.data.data || [];
  },

  getByGuest: async (guestId: number): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>(`/bookings/guest/${guestId}`);
    return response.data.data || [];
  },

  getByRoom: async (roomId: number): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>(`/bookings/room/${roomId}`);
    return response.data.data || [];
  },

  getTodayCheckIns: async (): Promise<any[]> => {
    const response = await api.get<ApiResponse<any[]>>('/bookings/today/check-ins');
    return response.data.data || [];
  },

  getTodayCheckOuts: async (): Promise<any[]> => {
    const response = await api.get<ApiResponse<any[]>>('/bookings/today/check-outs');
    return response.data.data || [];
  },

  getStatistics: async (): Promise<any> => {
    const response = await api.get<ApiResponse<any>>('/bookings/statistics');
    return response.data.data;
  },

  create: async (bookingData: any): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData);
    return response.data.data!;
  },

  update: async (id: number, updates: any): Promise<Booking> => {
    const response = await api.put<ApiResponse<Booking>>(`/bookings/${id}`, updates);
    return response.data.data!;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  },
};

// ============================================
// DASHBOARD API
// ============================================

export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    const [roomStats, bookingStats, todayCheckIns, todayCheckOuts] = await Promise.all([
      roomAPI.getStatistics(),
      bookingAPI.getStatistics(),
      bookingAPI.getTodayCheckIns(),
      bookingAPI.getTodayCheckOuts(),
    ]);

    return {
      totalRooms: roomStats.total || 0,
      occupiedRooms: roomStats.occupied || 0,
      availableRooms: roomStats.vacant || 0,
      checkInsToday: todayCheckIns.length,
      checkOutsToday: todayCheckOuts.length,
      totalRevenue: bookingStats.totalRevenue || 0,
      occupancyRate: roomStats.total > 0 
        ? Math.round((roomStats.occupied / roomStats.total) * 100) 
        : 0,
    };
  },
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.data.success;
  } catch (error) {
    return false;
  }
};

export default api;