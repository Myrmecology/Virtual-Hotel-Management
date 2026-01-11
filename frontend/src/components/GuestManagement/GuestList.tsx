import React from 'react';
import { Guest } from '../../types';

interface GuestListProps {
  guests: Guest[];
  selectedGuestId?: number;
  onGuestSelect: (guest: Guest) => void;
  onGuestDelete: (guestId: number) => void;
}

const GuestList: React.FC<GuestListProps> = ({
  guests,
  selectedGuestId,
  onGuestSelect,
  onGuestDelete,
}) => {
  if (guests.length === 0) {
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
        NO GUESTS FOUND
      </div>
    );
  }

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 150px)' }}>
      <div style={{ display: 'grid', gap: '12px' }}>
        {guests.map((guest) => (
          <div
            key={guest.id}
            onClick={() => onGuestSelect(guest)}
            className="fade-in"
            style={{
              backgroundColor: '#000000',
              border:
                selectedGuestId === guest.id
                  ? '3px solid #FF0000'
                  : '2px solid #FF0000',
              padding: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              boxShadow:
                selectedGuestId === guest.id
                  ? '0 0 15px rgba(255, 0, 0, 0.6)'
                  : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                selectedGuestId === guest.id
                  ? '0 0 15px rgba(255, 0, 0, 0.6)'
                  : 'none';
            }}
          >
            {/* Guest Name */}
            <div
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                marginBottom: '8px',
              }}
            >
              {guest.firstName.toUpperCase()} {guest.lastName.toUpperCase()}
            </div>

            {/* Guest Info */}
            <div
              style={{
                display: 'grid',
                gap: '5px',
                fontSize: '11px',
                letterSpacing: '0.5px',
                opacity: 0.8,
              }}
            >
              <div>📧 {guest.email}</div>
              <div>📞 {guest.phone}</div>
              {guest.nationality && <div>🌍 {guest.nationality.toUpperCase()}</div>}
              <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.6 }}>
                ID: {guest.idNumber}
              </div>
            </div>

            {/* Corner accent */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '6px',
                height: '6px',
                backgroundColor: '#FF0000',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;