import React from 'react';

interface VBoyContainerProps {
  children: React.ReactNode;
  title?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
}

const VBoyContainer: React.FC<VBoyContainerProps> = ({
  children,
  title,
  fullHeight = false,
  noPadding = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#000000',
        border: '3px solid #FF0000',
        padding: noPadding ? 0 : '20px',
        position: 'relative',
        height: fullHeight ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Corner decorations */}
      <div
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: '12px',
          height: '12px',
          borderTop: '3px solid #FF0000',
          borderLeft: '3px solid #FF0000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          width: '12px',
          height: '12px',
          borderTop: '3px solid #FF0000',
          borderRight: '3px solid #FF0000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: '-2px',
          width: '12px',
          height: '12px',
          borderBottom: '3px solid #FF0000',
          borderLeft: '3px solid #FF0000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '12px',
          height: '12px',
          borderBottom: '3px solid #FF0000',
          borderRight: '3px solid #FF0000',
        }}
      />

      {/* Title */}
      {title && (
        <div
          style={{
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px solid #FF0000',
          }}
        >
          <h2
            style={{
              color: '#FF0000',
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: "'Courier New', monospace",
              margin: 0,
              textShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
            }}
          >
            {title}
          </h2>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflow: fullHeight ? 'auto' : 'visible' }}>
        {children}
      </div>
    </div>
  );
};

export default VBoyContainer;