import React from 'react';

interface VBoyInputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'date';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

const VBoyInput: React.FC<VBoyInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label,
  disabled = false,
  required = false,
}) => {
  return (
    <div style={{ marginBottom: '15px', width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            color: '#FF0000',
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: "'Courier New', monospace",
          }}
        >
          {label}
          {required && <span style={{ color: '#FF0000', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="vboy-input"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#000000',
          color: '#FF0000',
          border: '2px solid #FF0000',
          fontFamily: "'Courier New', monospace",
          fontSize: '14px',
          letterSpacing: '1px',
          outline: 'none',
          transition: 'all 0.2s',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            e.currentTarget.style.borderColor = '#FF0000';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};

export default VBoyInput;