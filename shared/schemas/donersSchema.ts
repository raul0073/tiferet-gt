import { z } from 'zod';

export const donersSchema = z.object({
  fullName: z.string().min(2, {message: "שם תורם חייב להיות מינימום 2 תווים"}),
  amountDonated: z.number(),
  contact: z.string().optional()
});

export type IDoner = z.infer<typeof donersSchema>;