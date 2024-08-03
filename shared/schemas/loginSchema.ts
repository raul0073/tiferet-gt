import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "כתובת מייל אינה חוקית" }),
  password: z.string().min(4, { message: "ססימה מכילה לפחות 4 תווים" }),
});

export type ILogin = z.infer<typeof loginSchema>;