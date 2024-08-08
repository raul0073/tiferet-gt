import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { loginSchema, ILogin } from './../../../../shared/schemas/loginSchema';
import { ObjectId } from '@fastify/mongodb';
import  bcrypt  from 'bcryptjs';

export const loginRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const usersCollection = db?.collection('users');

    server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
           
            // validate body
            const userObj: ILogin = await loginSchema.parseAsync(request.body);
            // get usewr
            const user = await usersCollection?.findOne({ email: userObj.email });
            if (!user) {
                return reply.status(401).send({msg: "משתמש עם כתובת המייל לא נמצא"});
            }
            // check password
            const isPasswordMatch = (userObj.password, user.password);
            if (!isPasswordMatch) {
                return reply.status(401).send({ msg: "סיסמה לא תואמת" });
            }
            if (!isPasswordMatch) {
                return reply.status(401).send({msg: "סיסמה לא תואמת"});
            }


            const token = server.jwt.sign({ _id: user._id, email: user.email });

            await usersCollection?.updateOne(
                { _id: new ObjectId(user._id) },
                { $set: { lastSeen: new Date() } }
            );
            return reply.status(200).send({user: user, token: token});

        } catch (err) {
            return reply.status(500).send(`ERROR: ${err}`);
        }
    });
};