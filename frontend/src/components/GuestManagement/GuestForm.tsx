import React, { useState, useEffect } from 'react';
import VBoyContainer from '../UI/VBoyContainer';
import VBoyInput from '../UI/VBoyInput';
import HexButton from '../UI/HexButton';
import { Guest } from '../../types';

interface GuestFormProps {
  guest: Guest | null;
  onSubmit: (guestData: any) => void;
  onCancel: () => void;
}

const GuestForm: React.FC<GuestFormProps> = ({ guest, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    idNumber: '',
    nationality: '',
  });

  useEffect(() => {
    if (guest) {
      setFormData({
        firstName: guest.firstName,
        lastName: guest.lastName,
        email: guest.email,
        phone: guest.phone,
        address: guest.address || '',
        idNumber: guest.idNumber,
        nationality: guest.nationality || '',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        idNumber: '',
        nationality: '',
      });
    }
  }, [guest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <VBoyContainer
      title={guest ? 'EDIT GUEST' : 'NEW GUEST'}
      fullHeight
    >
      <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <VBoyInput
            label="First Name"
            value={formData.firstName}
            onChange={(value) => handleChange('firstName', value)}
            placeholder="JOHN"
            required
          />

          <VBoyInput
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => handleChange('lastName', value)}
            placeholder="DOE"
            required
          />

          <VBoyInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            placeholder="JOHN.DOE@EMAIL.COM"
            required
          />

          <VBoyInput
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            placeholder="+1-555-0123"
            required
          />

          <VBoyInput
            label="ID Number"
            value={formData.idNumber}
            onChange={(value) => handleChange('idNumber', value)}
            placeholder="ID123456"
            required
            disabled={!!guest} // Can't change ID number when editing
          />

          <VBoyInput
            label="Nationality"
            value={formData.nationality}
            onChange={(value) => handleChange('nationality', value)}
            placeholder="USA"
          />

          <VBoyInput
            label="Address"
            value={formData.address}
            onChange={(value) => handleChange('address', value)}
            placeholder="123 MAIN ST, CITY"
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #FF0000',
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
          }}
        >
          <HexButton type="submit" size="medium">
            {guest ? 'UPDATE' : 'CREATE'}
          </HexButton>
          <HexButton type="button" size="medium" onClick={onCancel}>
            CANCEL
          </HexButton>
        </div>
      </form>
    </VBoyContainer>
  );
};

export default GuestForm;