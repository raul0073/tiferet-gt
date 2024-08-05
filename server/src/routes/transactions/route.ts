import { ObjectId } from "@fastify/mongodb";
import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const transactionRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const transactionsCollection = db?.collection('transactions');

    // GET: Fetch all synagogue transactions
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // get transactions
            const transactions = await transactionsCollection?.find({}).sort({ createdAt: -1 }).toArray()
            if (!transactions || transactions.length === 0) {
                return reply.status(404).send({ error: 'Could not get transactions collection' });
            }
            return reply.status(200).send(transactions);
        } catch (error) {
            server.log.error('Error querying MongoDB:', error);
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });
    server.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string };

            if (!ObjectId.isValid(id)) {
                return reply.status(400).send({ error: 'Invalid transaction ID format' });
            }

            const transaction = await transactionsCollection?.findOne({ _id: new ObjectId(id) });
            console.log(transaction)
            if (!transaction) {
                return reply.status(404).send({ error: 'Transaction not found' });
            }

            return reply.status(200).send(transaction);
        } catch (err) {
            server.log.error('Error querying MongoDB:', err);
            return reply.status(500).send({ error: 'Internal Server Error', msg: err });
        }
    });

};

export default transactionRoute;