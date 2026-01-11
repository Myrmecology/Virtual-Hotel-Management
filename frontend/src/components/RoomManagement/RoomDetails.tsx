import React, { useState } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import HexButton from '../UI/HexButton';
import { Room } from '../../types';

interface RoomDetailsProps {
  room: Room;
  onUpdate: (roomId: number, updates: any) => void;
  onClose: () => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, onUpdate, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    onUpdate(room.id, { status: newStatus });
  };

  return (
    <VBoyContainer title="ROOM DETAILS" fullHeight>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Room Info */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Room Number */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                letterSpacing: '4px',
                textShadow: '0 0 15px rgba(255, 0, 0, 0.8)',
                marginBottom: '10px',
              }}
            >
              ROOM {room.roomNumber}
            </div>
            <div
              style={{
                fontSize: '14px',
                letterSpacing: '2px',
                opacity: 0.7,
              }}
            >
              FLOOR {room.floor}
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gap: '15px' }}>
            {/* Type */}
            <div
              style={{
                padding: '12px',
                border: '2px solid #FF0000',
              }}
            >
              <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '5px' }}>
                TYPE
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px' }}>
                {room.type.toUpperCase()}
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                padding: '12px',
                border: '2px solid #FF0000',
              }}
            >
              <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '5px' }}>
                STATUS
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  color: room.status === 'occupied' ? '#FF0000' : '#CC0000',
                }}
                className={room.status === 'occupied' ? 'vboy-blink' : ''}
              >
                {room.status.toUpperCase()}
              </div>
            </div>

            {/* Price */}
            <div
              style={{
                padding: '12px',
                border: '2px solid #FF0000',
              }}
            >
              <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '5px' }}>
                PRICE PER NIGHT
              </div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '2px' }}>
                ${room.pricePerNight}
              </div>
            </div>

            {/* Capacity */}
            <div
              style={{
                padding: '12px',
                border: '2px solid #FF0000',
              }}
            >
              <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '5px' }}>
                CAPACITY
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px' }}>
                {room.capacity} {room.capacity === 1 ? 'GUEST' : 'GUESTS'}
              </div>
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div
                style={{
                  padding: '12px',
                  border: '2px solid #FF0000',
                }}
              >
                <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '8px' }}>
                  AMENITIES
                </div>
                <div style={{ fontSize: '12px', letterSpacing: '1px', lineHeight: '1.8' }}>
                  {room.amenities.map((amenity, index) => (
                    <div key={index}>• {amenity.toUpperCase()}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #FF0000',
          }}
        >
          <div style={{ fontSize: '12px', marginBottom: '12px', letterSpacing: '1px' }}>
            CHANGE STATUS:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <HexButton
              size="small"
              onClick={() => handleStatusChange('vacant')}
              disabled={room.status === 'vacant'}
            >
              VACANT
            </HexButton>
            <HexButton
              size="small"
              onClick={() => handleStatusChange('occupied')}
              disabled={room.status === 'occupied'}
            >
              OCCUPIED
            </HexButton>
            <HexButton
              size="small"
              onClick={() => handleStatusChange('cleaning')}
              disabled={room.status === 'cleaning'}
            >
              CLEANING
            </HexButton>
            <HexButton
              size="small"
              onClick={() => handleStatusChange('maintenance')}
              disabled={room.status === 'maintenance'}
            >
              MAINT
            </HexButton>
          </div>

          <HexButton size="medium" onClick={onClose}>
            CLOSE
          </HexButton>
        </div>
      </div>
    </VBoyContainer>
  );
};

export default RoomDetails;