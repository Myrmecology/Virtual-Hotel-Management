import React, { useEffect, useState } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import RoomGrid from './RoomGrid';
import RoomDetails from './RoomDetails';
import HexButton from '../UI/HexButton';
import { roomAPI } from '../../services/api';
import { Room } from '../../types';

const RoomManagement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const roomsData = await roomAPI.getAll();
      setRooms(roomsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load rooms');
      console.error('Room loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleRoomUpdate = async (roomId: number, updates: any) => {
    try {
      await roomAPI.update(roomId, updates);
      await loadRooms();
      // Update selected room if it's the one being updated
      if (selectedRoom && selectedRoom.id === roomId) {
        const updatedRoom = await roomAPI.getById(roomId);
        setSelectedRoom(updatedRoom);
      }
    } catch (err: any) {
      console.error('Failed to update room:', err);
      alert('Failed to update room: ' + err.message);
    }
  };

  const handleCloseDetails = () => {
    setSelectedRoom(null);
  };

  const filteredRooms = filterStatus === 'all' 
    ? rooms 
    : rooms.filter(room => room.status === filterStatus);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <div className="loading-text">LOADING ROOMS...</div>
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
    <div style={{ height: '100%', display: 'flex', gap: '20px' }}>
      {/* Rooms List */}
      <div style={{ flex: selectedRoom ? '0 0 60%' : '1' }}>
        <VBoyContainer title="ROOM MANAGEMENT" fullHeight>
          {/* Filter Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}>
            <HexButton
              size="small"
              onClick={() => setFilterStatus('all')}
              variant={filterStatus === 'all' ? 'primary' : 'secondary'}
            >
              ALL
            </HexButton>
            <HexButton
              size="small"
              onClick={() => setFilterStatus('vacant')}
              variant={filterStatus === 'vacant' ? 'primary' : 'secondary'}
            >
              VACANT
            </HexButton>
            <HexButton
              size="small"
              onClick={() => setFilterStatus('occupied')}
              variant={filterStatus === 'occupied' ? 'primary' : 'secondary'}
            >
              OCCUPIED
            </HexButton>
            <HexButton
              size="small"
              onClick={() => setFilterStatus('cleaning')}
              variant={filterStatus === 'cleaning' ? 'primary' : 'secondary'}
            >
              CLEANING
            </HexButton>
            <HexButton
              size="small"
              onClick={() => setFilterStatus('maintenance')}
              variant={filterStatus === 'maintenance' ? 'primary' : 'secondary'}
            >
              MAINT
            </HexButton>
          </div>

          {/* Room Grid */}
          <RoomGrid 
            rooms={filteredRooms} 
            onRoomSelect={handleRoomSelect}
            selectedRoomId={selectedRoom?.id}
          />

          {/* Stats */}
          <div style={{ 
            marginTop: '20px', 
            paddingTop: '15px',
            borderTop: '2px solid #FF0000',
            fontSize: '12px',
            letterSpacing: '1px',
          }}>
            <div>TOTAL ROOMS: {filteredRooms.length}</div>
            <div style={{ marginTop: '5px' }}>
              SHOWING: {filterStatus.toUpperCase()}
            </div>
          </div>
        </VBoyContainer>
      </div>

      {/* Room Details Panel */}
      {selectedRoom && (
        <div style={{ flex: '0 0 38%' }} className="slide-in-right">
          <RoomDetails
            room={selectedRoom}
            onUpdate={handleRoomUpdate}
            onClose={handleCloseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default RoomManagement;