import { z } from 'zod';

export const addOrderSchema = z.object({
  name: z.array(z.string()), 
  userId: z.string(),
  parasha: z.string().min(2, { message: 'Parasha must have min 2 characters' }),
  price: z.number(),
  pricePaid: z.number().default(0),
  beenPaid: z.boolean().default(false),
  orderInvoice: z.string().optional(),
  doneBy: z.string().optional()
});

export type IOrder = z.infer<typeof addOrderSchema>;



export type OrderType = {
    _id: string,
    userId: string,
    userName: string,
    name: [],
    parasha: string,
    price: number,
    pricePaid: number,
    beenPaid: boolean,
    orderInvoice?: string,
    doneBy: string,
    createdAt: Date;
}



