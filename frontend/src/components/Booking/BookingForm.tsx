import React, { useState, useEffect } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import VBoyInput from '../UI/VBoyInput';
import HexButton from '../UI/HexButton';
import { Booking } from '../../types';

interface BookingFormProps {
  booking: Booking | null;
  onSubmit: (bookingData: any) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ booking, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    guestId: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    specialRequests: '',
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        guestId: booking.guestId.toString(),
        roomId: booking.roomId.toString(),
        checkInDate: booking.checkInDate.split('T')[0],
        checkOutDate: booking.checkOutDate.split('T')[0],
        specialRequests: booking.specialRequests || '',
      });
    } else {
      // Set default check-in to today
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      setFormData({
        guestId: '',
        roomId: '',
        checkInDate: today,
        checkOutDate: tomorrowStr,
        specialRequests: '',
      });
    }
  }, [booking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate dates
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);

    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }

    const submitData = {
      guestId: parseInt(formData.guestId),
      roomId: parseInt(formData.roomId),
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      specialRequests: formData.specialRequests || undefined,
    };

    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <VBoyContainer title={booking ? 'EDIT BOOKING' : 'NEW BOOKING'}>
      <form onSubmit={handleSubmit}>
        <VBoyInput
          label="Guest ID"
          type="number"
          value={formData.guestId}
          onChange={(value) => handleChange('guestId', value)}
          placeholder="1"
          required
        />

        <VBoyInput
          label="Room ID"
          type="number"
          value={formData.roomId}
          onChange={(value) => handleChange('roomId', value)}
          placeholder="1"
          required
        />

        <VBoyInput
          label="Check-In Date"
          type="date"
          value={formData.checkInDate}
          onChange={(value) => handleChange('checkInDate', value)}
          required
        />

        <VBoyInput
          label="Check-Out Date"
          type="date"
          value={formData.checkOutDate}
          onChange={(value) => handleChange('checkOutDate', value)}
          required
        />

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              color: '#FF0000',
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontFamily: "'Courier New', monospace",
            }}
          >
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            placeholder="ANY SPECIAL REQUESTS..."
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#000000',
              color: '#FF0000',
              border: '2px solid #FF0000',
              fontFamily: "'Courier New', monospace",
              fontSize: '14px',
              letterSpacing: '1px',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #FF0000',
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
          }}
        >
          <HexButton type="submit" size="medium">
            {booking ? 'UPDATE' : 'CREATE'}
          </HexButton>
          <HexButton type="button" size="medium" onClick={onCancel}>
            CANCEL
          </HexButton>
        </div>
      </form>
    </VBoyContainer>
  );
};

export default BookingForm;