import React from 'react';
import { Room } from '../../types';

interface RoomGridProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
  selectedRoomId?: number;
}

const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onRoomSelect, selectedRoomId }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vacant':
        return '#003300';
      case 'occupied':
        return '#FF0000';
      case 'cleaning':
        return '#CC6600';
      case 'maintenance':
        return '#666600';
      default:
        return '#FF0000';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.toUpperCase();
  };

  // Group rooms by floor
  const roomsByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, Room[]>);

  const floors = Object.keys(roomsByFloor).map(Number).sort((a, b) => b - a);

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 100px)' }}>
      {floors.map((floor) => (
        <div key={floor} style={{ marginBottom: '25px' }}>
          {/* Floor Header */}
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '2px solid #FF0000',
              textShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
            }}
          >
            FLOOR {floor}
          </div>

          {/* Rooms Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '12px',
            }}
          >
            {roomsByFloor[floor]
              .sort((a, b) => a.roomNumber.localeCompare(b.roomNumber))
              .map((room) => (
                <div
                  key={room.id}
                  onClick={() => onRoomSelect(room)}
                  className="zoom-in"
                  style={{
                    backgroundColor: '#000000',
                    border: selectedRoomId === room.id ? '3px solid #FF0000' : '2px solid #FF0000',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    boxShadow: selectedRoomId === room.id 
                      ? '0 0 15px rgba(255, 0, 0, 0.6)' 
                      : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = selectedRoomId === room.id 
                      ? '0 0 15px rgba(255, 0, 0, 0.6)' 
                      : 'none';
                  }}
                >
                  {/* Room Number */}
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                      marginBottom: '8px',
                    }}
                  >
                    {room.roomNumber}
                  </div>

                  {/* Room Type */}
                  <div
                    style={{
                      fontSize: '10px',
                      letterSpacing: '1px',
                      marginBottom: '8px',
                      opacity: 0.7,
                    }}
                  >
                    {room.type.toUpperCase()}
                  </div>

                  {/* Status Indicator */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '10px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: getStatusColor(room.status),
                        border: '1px solid #FF0000',
                      }}
                      className={room.status === 'occupied' ? 'vboy-blink' : ''}
                    />
                    {getStatusLabel(room.status)}
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      fontSize: '11px',
                      marginTop: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid #FF0000',
                      opacity: 0.8,
                    }}
                  >
                    ${room.pricePerNight}/NIGHT
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;