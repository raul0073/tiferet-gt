import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IOrder, OrderType, addOrderSchema } from './../../../../shared/schemas/orderSchema'
import { ObjectId } from "@fastify/mongodb";
import { UserType } from "../../models/users";
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

            const user = await usersCollection?.findOne<UserType>({ _id: new ObjectId(orderObj.userId) })

            // Adjust user balance
            if (orderObj && user) {
                let updatedBalance = user.balance;
                if (orderObj.pricePaid > orderObj.price) {
                    updatedBalance += orderObj.pricePaid - orderObj.price;
                } else if (orderObj.price > orderObj.pricePaid) {
                    updatedBalance -= (orderObj.price - orderObj.pricePaid);
                    orderObj.beenPaid = false; // Mark as unpaid if full amount isn't covered
                }

                // Update the user's balance in the database
                await usersCollection?.updateOne(
                    { _id: user._id },
                    { $set: { balance: updatedBalance } }
                );
            }


            // add user name and date to order
            const newOrderObj = {
                ...orderObj,
                createdAt: new Date(),
                userName: `${user?.firstName} ${user?.lastName}`
            };
            console.log(newOrderObj)
            const insertRes = await ordersCollection?.insertOne(newOrderObj);
            return reply.status(200).send(insertRes);
        } catch (error) {
            server.log.error('Error querying MongoDB:', error);
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });

};

export default ordersRoute;