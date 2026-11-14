import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string()
    .min(8, 'Your password must contain at least 8 characters.'),
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(1, 'Username required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
