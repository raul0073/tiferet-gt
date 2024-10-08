import { z } from 'zod';
import { UserType } from './userSchema';

export const loginSchema = z.object({
  email: z.string().email({ message: "כתובת מייל אינה חוקית" }),
  password: z.string().min(4, { message: "סיסמה מכילה לפחות 4 תווים" }),
});

export type ILogin = z.infer<typeof loginSchema>;


export type LoginDTO = {
  user: UserType,
  token: string
}