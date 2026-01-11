import React from 'react';
import { DashboardStats } from '../../types';

interface StatsPanelProps {
  stats: DashboardStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const statItems = [
    { label: 'TOTAL ROOMS', value: stats.totalRooms, unit: '' },
    { label: 'OCCUPIED', value: stats.occupiedRooms, unit: '' },
    { label: 'AVAILABLE', value: stats.availableRooms, unit: '' },
    { label: 'CHECK-INS', value: stats.checkInsToday, unit: '' },
    { label: 'CHECK-OUTS', value: stats.checkOutsToday, unit: '' },
    { label: 'OCCUPANCY', value: stats.occupancyRate, unit: '%' },
    { label: 'REVENUE', value: `$${stats.totalRevenue.toLocaleString()}`, unit: '' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '15px',
      }}
    >
      {statItems.map((item, index) => (
        <div
          key={index}
          className="slide-in-top"
          style={{
            backgroundColor: '#000000',
            border: '2px solid #FF0000',
            padding: '15px',
            textAlign: 'center',
            position: 'relative',
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Top corner accent */}
          <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              width: '6px',
              height: '6px',
              backgroundColor: '#FF0000',
            }}
          />

          {/* Label */}
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '1px',
              marginBottom: '8px',
              opacity: 0.7,
              fontFamily: "'Courier New', monospace",
            }}
          >
            {item.label}
          </div>

          {/* Value */}
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontFamily: "'Courier New', monospace",
              textShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
            }}
          >
            {item.value}
            {item.unit && (
              <span style={{ fontSize: '16px', marginLeft: '2px' }}>
                {item.unit}
              </span>
            )}
          </div>

          {/* Bottom corner accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              width: '6px',
              height: '6px',
              backgroundColor: '#FF0000',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;