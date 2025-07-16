import z from 'zod';
import { passwordRegex } from './utils';

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(
        6,
        'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number and one special character',
      )
      .regex(
        passwordRegex,
        'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number and one special character',
      ),
    confirmPassword: z
      .string()
      .min(
        6,
        'Confirm Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number and one special character',
      )
      .regex(
        passwordRegex,
        'Confirm Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number and one special character',
      ),
    businessName: z.string().min(1, 'Business name is required'),
    phone: z
      .string()
      .length(11, 'Phone number must be at least 11 digits long')
      .refine((val) => {
        // Right now only supports PK phone numbers
        return val.startsWith('0');
      }, 'Phone number must start with 0'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
  });
