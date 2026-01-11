import React, { useEffect, useState } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';
import HexButton from '../UI/HexButton';
import { bookingAPI } from '../../services/api';
import { Booking } from '../../types';

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookingsData = await bookingAPI.getAll();
      setBookings(bookingsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
      console.error('Booking loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSelect = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowForm(false);
  };

  const handleCreateNew = () => {
    setSelectedBooking(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (bookingData: any) => {
    try {
      if (selectedBooking) {
        await bookingAPI.update(selectedBooking.id, bookingData);
      } else {
        await bookingAPI.create(bookingData);
      }
      await loadBookings();
      setShowForm(false);
      setSelectedBooking(null);
    } catch (err: any) {
      console.error('Failed to save booking:', err);
      alert('Failed to save booking: ' + err.message);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      await bookingAPI.delete(bookingId);
      await loadBookings();
      setSelectedBooking(null);
    } catch (err: any) {
      console.error('Failed to delete booking:', err);
      alert('Failed to delete booking: ' + err.message);
    }
  };

  const filteredBookings =
    filterStatus === 'all'
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <div className="loading-text">LOADING BOOKINGS...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠</div>
        <div className="error-title">ERROR</div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header with Filters */}
      <VBoyContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ 
            fontSize: '24px', 
            letterSpacing: '3px', 
            margin: 0,
            textShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
          }}>
            BOOKING MANAGEMENT
          </h2>
          <HexButton size="medium" onClick={handleCreateNew}>
            NEW
          </HexButton>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
          <HexButton
            size="small"
            onClick={() => setFilterStatus('all')}
            variant={filterStatus === 'all' ? 'primary' : 'secondary'}
          >
            ALL
          </HexButton>
          <HexButton
            size="small"
            onClick={() => setFilterStatus('pending')}
            variant={filterStatus === 'pending' ? 'primary' : 'secondary'}
          >
            PENDING
          </HexButton>
          <HexButton
            size="small"
            onClick={() => setFilterStatus('confirmed')}
            variant={filterStatus === 'confirmed' ? 'primary' : 'secondary'}
          >
            CONFIRMED
          </HexButton>
          <HexButton
            size="small"
            onClick={() => setFilterStatus('checked-in')}
            variant={filterStatus === 'checked-in' ? 'primary' : 'secondary'}
          >
            CHECKED-IN
          </HexButton>
          <HexButton
            size="small"
            onClick={() => setFilterStatus('checked-out')}
            variant={filterStatus === 'checked-out' ? 'primary' : 'secondary'}
          >
            CHECKED-OUT
          </HexButton>
        </div>
      </VBoyContainer>

      {/* Booking Calendar/List */}
      <div style={{ flex: 1 }}>
        <VBoyContainer fullHeight>
          <BookingCalendar
            bookings={filteredBookings}
            onBookingSelect={handleBookingSelect}
            onBookingDelete={handleDeleteBooking}
            selectedBookingId={selectedBooking?.id}
          />
        </VBoyContainer>
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          className="fade-in"
        >
          <div style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
            <BookingForm
              booking={selectedBooking}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;