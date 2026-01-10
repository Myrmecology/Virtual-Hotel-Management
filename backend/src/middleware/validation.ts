import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

// Middleware to handle validation errors
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Return validation errors
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors.array(),
    });
  };
};

// Custom validation helpers
export const isValidDate = (value: string): boolean => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export const isValidRoomType = (value: string): boolean => {
  const validTypes = ['single', 'double', 'suite', 'deluxe'];
  return validTypes.includes(value);
};

export const isValidRoomStatus = (value: string): boolean => {
  const validStatuses = ['vacant', 'occupied', 'cleaning', 'maintenance'];
  return validStatuses.includes(value);
};

export const isValidBookingStatus = (value: string): boolean => {
  const validStatuses = ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'];
  return validStatuses.includes(value);
};

export const isValidPaymentStatus = (value: string): boolean => {
  const validStatuses = ['unpaid', 'partial', 'paid', 'refunded'];
  return validStatuses.includes(value);
};