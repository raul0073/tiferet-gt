import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 6 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  hasAccess: z.boolean({ message: "hasAccess must be a boolean" }),
  hasDebt: z.boolean({ message: "hasDebt must be a boolean" }),
  balance: z.number({ message: "Balance must be a number" }).min(0, { message: "Balance must be a positive number" }),
});

export type IUser = z.infer<typeof userSchema>;


export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  hasAccess: boolean;
  hasDebt: boolean;
  balance: number;
  lastSeen: Date;
}