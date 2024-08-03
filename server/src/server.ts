import fastifyCors from "@fastify/cors";
import fastifyMongodb from "@fastify/mongodb";
import fastify from "fastify";
import mainRoute from "./routes/main";
import usersRoute from "./routes/users/route";
import dotenv from 'dotenv'
import { loginRoute } from "./routes/login/route";
import donersRoute from "./routes/doners/route";
dotenv.config()

const {MONGODB_URI, API_URL, PORT} = process.env
const shutdownKeys = ["SIGINIT", "SIGTERM"]


// initialize fastify app
const server = fastify({
    logger: {
        redact: ["hostname"],
        level: "info",
      }, 
    
})

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

// app routes
// home route
// Register routes in the 'onReady' lifecycle hook
server.register(mainRoute, {prefix: 'api/main'})
server.register(usersRoute, {prefix: 'api/users'})
server.register(loginRoute, {prefix: 'api/login'})
server.register(donersRoute, {prefix: 'api/doners'})


// start server
const start = async () => {
    try {
        
        await server.listen({
            port: 5000 || PORT,
        });
        
    
        // Log that the server is running
        console.log(`Server is running on ${API_URL}:${PORT}`);

        // Log that the app is connected to MongoDB Atlas
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