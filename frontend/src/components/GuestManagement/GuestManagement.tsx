import React, { useEffect, useState } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import GuestList from './GuestList';
import GuestForm from './GuestForm';
import HexButton from '../UI/HexButton';
import { guestAPI } from '../../services/api';
import { Guest } from '../../types';

const GuestManagement: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      setLoading(true);
      setError(null);
      const guestsData = await guestAPI.getAll();
      setGuests(guestsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load guests');
      console.error('Guest loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadGuests();
      return;
    }

    try {
      const results = await guestAPI.search(searchQuery);
      setGuests(results);
    } catch (err: any) {
      console.error('Search error:', err);
      alert('Search failed: ' + err.message);
    }
  };

  const handleGuestSelect = (guest: Guest) => {
  setSelectedGuest(guest);
  setShowForm(true);  // ← Change false to true
};

  const handleCreateNew = () => {
    setSelectedGuest(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (guestData: any) => {
    try {
      if (selectedGuest) {
        // Update existing guest
        await guestAPI.update(selectedGuest.id, guestData);
      } else {
        // Create new guest
        await guestAPI.create(guestData);
      }
      await loadGuests();
      setShowForm(false);
      setSelectedGuest(null);
    } catch (err: any) {
      console.error('Failed to save guest:', err);
      alert('Failed to save guest: ' + err.message);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedGuest(null);
  };

  const handleDeleteGuest = async (guestId: number) => {
    if (!confirm('Are you sure you want to delete this guest?')) {
      return;
    }

    try {
      await guestAPI.delete(guestId);
      await loadGuests();
      setSelectedGuest(null);
    } catch (err: any) {
      console.error('Failed to delete guest:', err);
      alert('Failed to delete guest: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <div className="loading-text">LOADING GUESTS...</div>
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
      {/* Guest List */}
      <div style={{ flex: showForm ? '0 0 50%' : '1' }}>
        <VBoyContainer title="GUEST MANAGEMENT" fullHeight>
          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="SEARCH GUESTS..."
              className="vboy-input"
              style={{ flex: 1, padding: '10px' }}
            />
            <HexButton size="small" onClick={handleSearch}>
              SEARCH
            </HexButton>
            <HexButton size="small" onClick={handleCreateNew}>
              NEW
            </HexButton>
          </div>

          {/* Guest List */}
          <GuestList
            guests={guests}
            selectedGuestId={selectedGuest?.id}
            onGuestSelect={handleGuestSelect}
            onGuestDelete={handleDeleteGuest}
          />

          {/* Stats */}
          <div
            style={{
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '2px solid #FF0000',
              fontSize: '12px',
              letterSpacing: '1px',
            }}
          >
            <div>TOTAL GUESTS: {guests.length}</div>
          </div>
        </VBoyContainer>
      </div>

      {/* Guest Form */}
      {showForm && (
        <div style={{ flex: '0 0 48%' }} className="slide-in-right">
          <GuestForm
            guest={selectedGuest}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}
    </div>
  );
};

export default GuestManagement;