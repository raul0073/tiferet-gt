import fastifyCors from "@fastify/cors";
import fastifyMongodb from "@fastify/mongodb";
import fastify from "fastify";
import mainRoute from "./routes/main";
import usersRoute from "./routes/users/route";
import dotenv from 'dotenv'
import { loginRoute } from "./routes/login/route";
import donersRoute from "./routes/doners/route";
import synagogueRoute from "./routes/transactions/route";
import balanceRoute from "./routes/balance/route";
import transactionRoute from "./routes/transactions/route";
import ordersRoute from "./routes/orders/route";
import fastifyJwt from "@fastify/jwt";
dotenv.config()

const {MONGODB_URI, API_URL, PORT, SECRET} = process.env
const shutdownKeys = ["SIGINIT", "SIGTERM"]


// initialize fastify app
const server = fastify({
    logger: {
        redact: ["hostname"],
        level: "info",
      }, 
    
})
const SECRET_KEY = SECRET || (() => {
    throw new Error('JWT secret is not defined');
})();

server.register(fastifyJwt, { secret: SECRET });
// fastify cors
server.register(fastifyCors, {
    origin: "*", 
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"]
  });


// register fastify-mongodb plugin
server.register(fastifyMongodb, {
    url: MONGODB_URI,
    forceClose: true, 
})


// routes
const routes = [
    { route: mainRoute, prefix: 'api/main' },
    { route: usersRoute, prefix: 'api/users' },
    { route: loginRoute, prefix: 'api/login' },
    { route: donersRoute, prefix: 'api/doners' },
    { route: transactionRoute, prefix: 'api/synagogue/transactions' },
    { route: balanceRoute, prefix: 'api/synagogue/balance' },
    { route: ordersRoute, prefix: 'api/orders' }
];
routes.forEach(({ route, prefix }) => {
    server.register(route, { prefix });
});


// start server
const start = async () => {
    try {
        
        await server.listen({
            port: 5000 || PORT,
        });
        
    
        
        console.info(`Server is running on ${API_URL}:${PORT}`);

        // start mongo session
        if (server.mongo.client.startSession()) {
            console.log('Connected to Atlas MongoDB ');
        } else {
            console.error('Failed to connect to MongoDB Atlas');
        }
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};


// restart sserver
shutdownKeys.forEach((signal: string) => {
    process.on(signal, async () => {
        await server.close()

        process.exit(0);
    })
})


start();