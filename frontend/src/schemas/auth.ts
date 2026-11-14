import { z } from 'zod';

export const loginSchema = z.object({
  email: z
  .email('Invalid email')
  .max(254, 'Email must not exceed 254 characters.'),

  password: z
    .string()
    .min(1, 'Password required.')
    .max(128, 'Password can not exceed 128 characters.')


});

export const registerSchema = loginSchema.extend({
  username: z
  .string()
  .min(3, 'Username must contain at least 3 characters.')
  .max(20, 'Username must not exceed 20 characters.')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username may only contain letters, digits, _ and -'),

  password: z
  .string()
  .min(8, 'Your password must contain at least 8 characters long.')
  .max(128, 'Password must not exceed 128 characters.')
  .regex(/[a-z]/, 'Your password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Your password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Your password must contain at least one number'),
  

});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
