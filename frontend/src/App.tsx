import React, { useState, useEffect } from 'react';
import ScanlineOverlay from './components/UI/ScanlineOverlay';
import Dashboard from './components/Dashboard/Dashboard';
import RoomManagement from './components/RoomManagement/RoomManagement';
import GuestManagement from './components/GuestManagement/GuestManagement';
import BookingManagement from './components/Booking/BookingManagement';
import { healthCheck } from './services/api';
import './styles/virtualboy.css';
import './styles/App.css';
import './styles/animations.css';

type View = 'dashboard' | 'rooms' | 'guests' | 'bookings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await healthCheck();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'rooms':
        return <RoomManagement />;
      case 'guests':
        return <GuestManagement />;
      case 'bookings':
        return <BookingManagement />;
      default:
        return <Dashboard />;
    }
  };

  if (isConnected === null) {
    return (
      <>
        <ScanlineOverlay />
        <div className="app">
          <div className="loading-container">
            <div className="loading-spinner" />
            <div className="loading-text">CONNECTING TO SERVER...</div>
          </div>
        </div>
      </>
    );
  }

  if (isConnected === false) {
    return (
      <>
        <ScanlineOverlay />
        <div className="app">
          <div className="error-container">
            <div className="error-icon vboy-pulse">⚠</div>
            <div className="error-title">CONNECTION ERROR</div>
            <div className="error-message">
              UNABLE TO CONNECT TO BACKEND SERVER
              <br />
              <br />
              MAKE SURE THE BACKEND IS RUNNING ON PORT 3000
            </div>
            <button
              onClick={checkConnection}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#000000',
                color: '#FF0000',
                border: '2px solid #FF0000',
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
                fontSize: '12px',
                letterSpacing: '1px',
              }}
            >
              RETRY CONNECTION
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ScanlineOverlay />
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div>
            <div className="app-title vboy-glow-pulse">VIRTUAL HOTEL</div>
            <div className="app-subtitle">MANAGEMENT SYSTEM V1.0</div>
          </div>

          {/* Navigation */}
          <nav className="app-nav">
            <button
              className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              DASHBOARD
            </button>
            <button
              className={`nav-button ${currentView === 'rooms' ? 'active' : ''}`}
              onClick={() => setCurrentView('rooms')}
            >
              ROOMS
            </button>
            <button
              className={`nav-button ${currentView === 'guests' ? 'active' : ''}`}
              onClick={() => setCurrentView('guests')}
            >
              GUESTS
            </button>
            <button
              className={`nav-button ${currentView === 'bookings' ? 'active' : ''}`}
              onClick={() => setCurrentView('bookings')}
            >
              BOOKINGS
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="app-main">
          <div className="app-content">{renderView()}</div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-left">
            <div className="footer-item">SYSTEM STATUS: ONLINE</div>
            <div className="footer-item">
              TIME: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-item">VIRTUAL BOY © 1995</div>
            <div className="footer-item">HOTEL MANAGEMENT SYSTEM</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;