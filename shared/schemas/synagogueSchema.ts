import { z } from 'zod';

export const transactionSchema = z.object({
  actionType: z.number().min(1).max(2, { message: "בחר סוג פעולה" }), // income or out
  paymentType: z.string().min(1).max(10, {message: "הזן סוג תשלום"}), // cash credit ertc
  expenseType: z.string().optional(), // household, maintanace etrc
  checkNo: z.string().optional(),// if check
  amountPaid: z.number().min(1, {message: "סכום חייב להיות גדול מ1"}),//amount
  paidTo: z.string().min(1).max(30, { message: "הזן שם"}),
  createdAt: z.date().default(new Date())
});

export type ITransaction = z.infer<typeof transactionSchema>;




export type TransactionType = {
    _id: string,
    actionType: number,
    paymentType: string,
    expenseType: string,
    checkNo: string,
    amountPaid: number,
    paidTo: string,
    createdAt: Date
}

