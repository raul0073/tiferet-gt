import { z } from 'zod';

export const transactionSchema = z.object({
  actionType: z.number().min(1).max(2, { message: "בחר סוג פעולה" }),
  paymentType: z.string().min(1).max(10, {message: "הזן סוג תשלום"}),
  checkNo: z.string().optional(),
  amountPaid: z.number().min(1, {message: "סכום חייב להיות גדול מ1"}),
  paidTo: z.string().min(1).max(30, { message: "הזן שם"}),
  createdAt: z.date().default(new Date())
});

export type ITransaction = z.infer<typeof transactionSchema>;




export type TransactionType = {
    _id: string,
    actionType: number,
    paymentType: string,
    checkNo: string,
    amountPaid: number,
    paidTo: string,
  createdAt: Date
}

