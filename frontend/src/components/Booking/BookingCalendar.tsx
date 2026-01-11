import React from 'react';
import { Booking } from '../../types';

interface BookingCalendarProps {
  bookings: Booking[];
  onBookingSelect: (booking: Booking) => void;
  onBookingDelete: (bookingId: number) => void;
  selectedBookingId?: number;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookings,
  onBookingSelect,
  onBookingDelete,
  selectedBookingId,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#666600';
      case 'confirmed':
        return '#CC6600';
      case 'checked-in':
        return '#FF0000';
      case 'checked-out':
        return '#003300';
      case 'cancelled':
        return '#330000';
      default:
        return '#FF0000';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).toUpperCase();
  };

  if (bookings.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          fontSize: '12px',
          letterSpacing: '1px',
          opacity: 0.6,
        }}
      >
        NO BOOKINGS FOUND
      </div>
    );
  }

  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'grid', gap: '15px' }}>
        {bookings
          .sort((a, b) => new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime())
          .map((booking) => (
            <div
              key={booking.id}
              onClick={() => onBookingSelect(booking)}
              className="fade-in"
              style={{
                backgroundColor: '#000000',
                border:
                  selectedBookingId === booking.id
                    ? '3px solid #FF0000'
                    : '2px solid #FF0000',
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                boxShadow:
                  selectedBookingId === booking.id
                    ? '0 0 15px rgba(255, 0, 0, 0.6)'
                    : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  selectedBookingId === booking.id
                    ? '0 0 15px rgba(255, 0, 0, 0.6)'
                    : 'none';
              }}
            >
              {/* Status Indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '5px 10px',
                  backgroundColor: getStatusColor(booking.status),
                  border: '1px solid #FF0000',
                  fontSize: '10px',
                  letterSpacing: '1px',
                }}
              >
                {booking.status.toUpperCase()}
              </div>

              {/* Booking ID */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  marginBottom: '12px',
                }}
              >
                BOOKING #{booking.id}
              </div>

              {/* Booking Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  fontSize: '11px',
                  letterSpacing: '0.5px',
                }}
              >
                <div>
                  <div style={{ opacity: 0.6, marginBottom: '4px' }}>CHECK-IN:</div>
                  <div style={{ fontWeight: 'bold' }}>{formatDate(booking.checkInDate)}</div>
                </div>

                <div>
                  <div style={{ opacity: 0.6, marginBottom: '4px' }}>CHECK-OUT:</div>
                  <div style={{ fontWeight: 'bold' }}>{formatDate(booking.checkOutDate)}</div>
                </div>

                <div>
                  <div style={{ opacity: 0.6, marginBottom: '4px' }}>GUEST ID:</div>
                  <div style={{ fontWeight: 'bold' }}>#{booking.guestId}</div>
                </div>

                <div>
                  <div style={{ opacity: 0.6, marginBottom: '4px' }}>ROOM ID:</div>
                  <div style={{ fontWeight: 'bold' }}>#{booking.roomId}</div>
                </div>

                <div>
                  <div style={{ opacity: 0.6, marginBottom: '4px' }}>TOTAL:</div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
                    ${booking.totalAmount.toFixed(2)}
                  </div>
                </div>

                <div>
                  <div style={{ opacity: 0.6, marginBottom: '4px' }}>PAYMENT:</div>
                  <div style={{ fontWeight: 'bold' }}>
                    {booking.paymentStatus.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.specialRequests && (
                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid #FF0000',
                    fontSize: '10px',
                    opacity: 0.7,
                  }}
                >
                  NOTE: {booking.specialRequests}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingCalendar;