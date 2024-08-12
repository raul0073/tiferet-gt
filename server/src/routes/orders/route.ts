import { ObjectId } from "@fastify/mongodb";
import { UserType } from "@shared/schemas/userSchema";
import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IOrder, OrderType, addOrderSchema } from './../../../../shared/schemas/orderSchema';
const ordersRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const ordersCollection = db?.collection('orders');
    const usersCollection = db?.collection('users');

    // GET: Fetch all orders transactions
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // get orders
            const orders = await ordersCollection?.find<OrderType[]>({}).sort({ createdAt: -1 }).toArray()
            if (!ordersCollection) {
                return reply.status(404).send({ error: 'Could not get orders collection' });
            }
            return reply.status(200).send(orders);
        } catch (error) {
            server.log.error('Error querying MongoDB:', error);
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });
   // POST: Add new order
server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const orderObj: IOrder = await addOrderSchema.parseAsync(request.body);
        if (!orderObj) {
            return reply.status(404).send({ error: 'Could not parse order obj' });
        }

        // Find the user associated with the order
        let user = await usersCollection?.findOne<UserType>({ _id: new ObjectId(orderObj.userId as string) });

        // Add user name and date to the new order
        const newOrderObj = {
            ...orderObj,
            createdAt: new Date(),
            userName: `${user?.firstName} ${user?.lastName}`
        };

        // Insert the new order into the database
        await ordersCollection?.insertOne(newOrderObj);

        // Adjust the user's balance
        if (user) {
            let updatedBalance = user.balance;
            if (orderObj.pricePaid > orderObj.price) {
                updatedBalance += (orderObj.pricePaid - orderObj.price);
            } else if (orderObj.price > orderObj.pricePaid) {
                updatedBalance -= (orderObj.price - orderObj.pricePaid);
                orderObj.beenPaid = false; // Mark as unpaid if full amount isn't covered
            }

            // Update the user's balance in the database
            const userUpdateResult = await usersCollection?.updateOne(
                { _id: user._id },
                { $set: { balance: updatedBalance } }
            );

            console.log(updatedBalance)

            // Fetch the updated user data
            user = await usersCollection?.findOne<UserType>({ _id: user._id });
        }

        // Fetch the user's orders
        const UserOrders = await ordersCollection?.find({ userId: orderObj.userId.toString() }).toArray();

        // Construct the response with the updated balance and orders
        const userWithOrders = {
            ...user,
            orders: UserOrders
        };
        console.log(userWithOrders)
        return reply.status(200).send(userWithOrders);
    } catch (error) {
        server.log.error('Error querying MongoDB:', error);
        return reply.status(500).send({ error: 'Internal Server Error', msg: error });
    }
});
    // PUT: update order with INVOICE only
        server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const { id } = request.params as { id: string };
                const { orderInvoice } = request.body as { orderInvoice: string };
                
                const orderUpdate = await ordersCollection?.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { orderInvoice: orderInvoice } }
                );

                return reply.status(200).send(orderUpdate);
            } catch (error) {
                server.log.error('Error querying MongoDB:', error);
                return reply.status(500).send({ error: 'Internal Server Error', msg: error });
            }
        });
    // DEL: Delete order
    server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string };
            if (!id) {
                return reply.status(404).send({ error: 'Invalid ID' });
            }
    
            // Find the order
            const order = await ordersCollection?.findOne<OrderType>({ _id: new ObjectId(id) });
            if (!order) {
                return reply.status(404).send({ error: 'No order found' });
            }
    
            // Find the user associated with the order
            const user = await usersCollection?.findOne<UserType>({ _id: new ObjectId(order.userId as string) });
            if (!user) {
                return reply.status(404).send({ error: 'Could not find user' });
            }
    
            // Calculate the updated balance
            let updatedBalance = user.balance;
            if (order.pricePaid > order.price) {
                updatedBalance -= (order.pricePaid - order.price);
            } else if (order.price > order.pricePaid) {
                updatedBalance += (order.price - order.pricePaid);
            }
    
            // Update the user's balance in the database
            const updateResult = await usersCollection?.updateOne(
                { _id: user._id },
                { $set: { balance: updatedBalance } }
            );
    
    
            // Delete the order
            await ordersCollection?.deleteOne({ _id: new ObjectId(id) });
            const UserOrders = await ordersCollection?.find({ userId: user._id.toString() }).toArray();
    
            // Construct the response with the updated balance
            const userWithOrders = {
                ...user,
                balance: updatedBalance,  // Use the updated balance directly
                orders: UserOrders
            };
    
            return reply.status(200).send(userWithOrders);
        } catch (error) {
            server.log.error('Error querying MongoDB:', error);
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });
    
   
};

export default ordersRoute;










// TODO
// add order to all users once a month
// server.post('/all', async (request: FastifyRequest, reply: FastifyReply) => {
//     try {
//         const month = new Date().getUTCMonth()
//         const orderObj: CollectiveOrderType = {
//             name: ['דמי-עמותה'],
//             userId: [], 
//             parasha: 'חיוב חודשי',
//             price: 15,
//             pricePaid: 0,
//             beenPaid: false,
//             orderInvoice: `INV123 ${month}`,
//             doneBy: 'מערכת',
//             notes: 'חיוב חודשי דמי עמותה'
//         };
//         if (!orderObj) {
//             return reply.status(404).send({ error: 'Could not parse order obj' });
//         }

//         const users = await usersCollection?.find<UserType>({}).toArray();
//         if (!users || users.length === 0) {
//             return reply.status(404).send({ error: 'Could not get users' });
//         }

//         const userIds = users?.map((user: UserType) => user._id);
        
//         const order = {
//             ...orderObj,
//             userId: userIds,
//             createdAt: new Date(),
//         };

//         userIds.forEach(async (Id: string) => {
//             await usersCollection?.updateOne(
//                 { _id: new ObjectId(Id) },
//                 { $set: { balance: -orderObj.price } }
//             );
//         })


//         await ordersCollection?.insertOne(order)
//         return reply.status(200).send(order);
//     } catch (error) {
//         server.log.error('Error querying MongoDB:', error);
//         return reply.status(500).send({ error: 'Internal Server Error', msg: error });
//     }
// });