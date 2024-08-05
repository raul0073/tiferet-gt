import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import {donersSchema, IDoner} from './../../../../shared/schemas/donersSchema'
const donersRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const donersCollection = db?.collection('doners');

    // GET: get all doners
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const doners = await donersCollection?.find({}).sort({createdAt: -1}).toArray()
            if (!doners) {
                return reply.status(404).send({ error: 'Could not get doners collection' });
            }
            return reply.status(200).send(doners);
        } catch (error) {
            return reply.status(500).send({ error: 'Internal Server Error', msg: error });
        }
    });

    // GET: get all doners
    server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const donerObj: IDoner = await donersSchema.parseAsync(request.body);
            if (!donerObj) {
                return reply.status(404).send({ error: `Problem adding doner. check doner obj again.` });
            }
            const res = await donersCollection?.insertOne(donerObj)
            
            return reply.status(200).send(res);
        } catch (err) {
            return reply.status(500).send({ error: 'Internal Server Error', msg: err });
        }
    });
};

export default donersRoute;