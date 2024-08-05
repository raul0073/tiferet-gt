import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const balanceRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const balanceCollection = db?.collection('balances');

    // GET: Fetch all synagogue transactions
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // get transactions
            const balance = await balanceCollection?.find({}).sort({ createdAt: -1 }).toArray()
            if (!balance || balance.length === 0) {
                return reply.status(404).send({ error: 'Could not get balance collection' });
            }
            return reply.status(200).send(balance);
        } catch (error) {
            server.log.error('Error querying MongoDB:', error);
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });

};

export default balanceRoute;