import { z } from 'zod';

export const profileSchema = z.object({
  username: z.string().trim()
    .min(3, 'The username must contain at least 3 characters.')
    .max(20, 'The username cannot exceed 20 characters.'),

  bio: z.string().trim()
    .max(200, 'The biography must not exceed 200 characters.'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;