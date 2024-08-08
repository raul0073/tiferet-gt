import { z } from 'zod';


export const balanceSchema = z.object({
  type: z.number(),
  transactionId: z.string(),
  transactionAmount: z.number(),
  balance: z.number(),
  createdAt: z.date().default(new Date())
});

export type IBalance = z.infer<typeof balanceSchema>;



export type BalanceType = {
    _id: string,
    type: number,
    transactionId: string,
    transactionAmount: number,
    balance: number,
    createdAt: Date
}