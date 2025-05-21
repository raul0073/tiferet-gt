import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import cron from "node-cron";

const {TARGET_URL} = process.env
let isPinging = true;
console.log("Auto-pinger is ON");


// ping every 14 minutes
cron.schedule("*/6 * * * *", async () => {
    if (isPinging && TARGET_URL) {
        try {
            const res = await fetch(TARGET_URL, {
                method: "GET"
            });
            console.log(`[PING] ${new Date().toISOString()} => ${res.status}`);
        } catch (err: any) {
            console.error(`[PING FAILED] ${new Date().toISOString()} => ${err.message}`);
        }
    }
});

const mainRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const endPoints = {
                main:  {
                    path: 'api/main',
                    methods: 'GET',
                    DATE: new Date().toLocaleTimeString()
                },
                prayers: {
                    users: {
                        path: 'api/users',
                        methods: 'GET, POST, PUT, DEL',
                        dynamic: '/:id'
                    },
                    orders: {
                        path: 'api/orders',
                        methods: 'GET, POST, PUT, DEL',
                        dynamic: '/:id'
                    },
                    balance: {
                        path: 'api/balance',
                        methods: 'GET, DEL'
                    },
                    customForms: {
                        path: 'api/custom',
                        methods: 'GET'
                    },
                },
                synagogue: {
                    doners: {
                        path: 'api/doners',
                        methods: 'GET, POST'
                    },
                    transactions: {
                        path: 'api/transactions',
                        methods: 'GET, POST, PUT, DEL',
                         dynamic: '/:id'
                    },
                },
            }
            return reply.status(200).send(endPoints)
        } catch (err) {
            reply.status(500).send({ error: 'Failed to connect to API' });
        }
    });
};

export default mainRoute;