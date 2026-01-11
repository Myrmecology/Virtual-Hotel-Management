import React, { useEffect, useState } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import HotelVisualization from './HotelVisualization';
import StatsPanel from './StatsPanel';
import { dashboardAPI, bookingAPI } from '../../services/api';
import { DashboardStats } from '../../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [todayCheckIns, setTodayCheckIns] = useState<any[]>([]);
  const [todayCheckOuts, setTodayCheckOuts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsData, checkIns, checkOuts] = await Promise.all([
        dashboardAPI.getStats(),
        bookingAPI.getTodayCheckIns(),
        bookingAPI.getTodayCheckOuts(),
      ]);

      setStats(statsData);
      setTodayCheckIns(checkIns);
      setTodayCheckOuts(checkOuts);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <div className="loading-text">LOADING DASHBOARD...</div>
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
      {/* Stats Panel */}
      {stats && <StatsPanel stats={stats} />}

      {/* Hotel Visualization */}
      <div style={{ flex: 1, minHeight: '300px' }}>
        <VBoyContainer title="HOTEL OVERVIEW" fullHeight>
          <HotelVisualization />
        </VBoyContainer>
      </div>

      {/* Today's Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Check-ins Today */}
        <VBoyContainer title={`CHECK-INS TODAY (${todayCheckIns.length})`}>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {todayCheckIns.length === 0 ? (
              <div style={{ 
                color: '#FF0000', 
                fontSize: '12px', 
                opacity: 0.6,
                letterSpacing: '1px' 
              }}>
                NO CHECK-INS TODAY
              </div>
            ) : (
              todayCheckIns.map((booking: any, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #FF0000',
                    fontSize: '12px',
                    letterSpacing: '1px',
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {booking.firstName} {booking.lastName}
                  </div>
                  <div style={{ opacity: 0.7, marginTop: '5px' }}>
                    ROOM: {booking.roomNumber} | TYPE: {booking.type?.toUpperCase()}
                  </div>
                </div>
              ))
            )}
          </div>
        </VBoyContainer>

        {/* Check-outs Today */}
        <VBoyContainer title={`CHECK-OUTS TODAY (${todayCheckOuts.length})`}>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {todayCheckOuts.length === 0 ? (
              <div style={{ 
                color: '#FF0000', 
                fontSize: '12px', 
                opacity: 0.6,
                letterSpacing: '1px' 
              }}>
                NO CHECK-OUTS TODAY
              </div>
            ) : (
              todayCheckOuts.map((booking: any, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #FF0000',
                    fontSize: '12px',
                    letterSpacing: '1px',
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {booking.firstName} {booking.lastName}
                  </div>
                  <div style={{ opacity: 0.7, marginTop: '5px' }}>
                    ROOM: {booking.roomNumber} | TYPE: {booking.type?.toUpperCase()}
                  </div>
                </div>
              ))
            )}
          </div>
        </VBoyContainer>
      </div>
    </div>
  );
};

export default Dashboard;