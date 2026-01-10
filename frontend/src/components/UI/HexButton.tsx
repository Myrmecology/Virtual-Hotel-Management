import React from 'react';

interface HexButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const HexButton: React.FC<HexButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  const sizeStyles = {
    small: { width: '80px', height: '40px', fontSize: '11px' },
    medium: { width: '120px', height: '50px', fontSize: '13px' },
    large: { width: '160px', height: '60px', fontSize: '15px' },
  };

  const style = sizeStyles[size];

  return (
    <button
      className={`hex-button hex-button-${variant} hex-button-${size}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'relative',
        width: style.width,
        height: style.height,
        backgroundColor: disabled ? '#1a0000' : '#000000',
        color: disabled ? '#660000' : '#FF0000',
        border: 'none',
        clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Courier New', monospace",
        fontSize: style.fontSize,
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        transition: 'all 0.2s',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#FF0000';
          e.currentTarget.style.color = '#000000';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.8)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#000000';
          e.currentTarget.style.color = '#FF0000';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(0.95)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '2px solid #FF0000',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </button>
  );
};

export default HexButton;