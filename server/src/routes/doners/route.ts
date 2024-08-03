import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const donersRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const donersCollection = db?.collection('doners');

    // GET: get all doners
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const doners = await donersCollection?.find({}).toArray()
            if (!doners) {
                return reply.status(404).send({ error: 'Could not get doners collection' });
            }
            return reply.status(200).send(doners);
        } catch (error) {
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });


};

export default donersRoute;