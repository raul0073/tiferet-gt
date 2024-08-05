import { z } from 'zod';

export const donersSchema = z.object({
  fullName: z.string().min(2, {message: "שם תורם חייב להיות מינימום 2 אותיות"}),
  amountDonated: z.number(),
  contact: z.string().optional(),
  createdAt: z.date().default(new Date())
});

export type IDoner = z.infer<typeof donersSchema>;