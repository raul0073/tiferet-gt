import { ObjectId } from "@fastify/mongodb";
import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IUser, userSchema } from './../../../../shared/schemas/userSchema';

const usersRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
  const db = server.mongo.db;
  const usersCollection = db?.collection('users');
  const ordersCollection = db?.collection('orders');

// GET: Fetch all users with their orders
server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // get orders and users
    const [users, orders] = await Promise.all([
      usersCollection?.find().toArray(),
      ordersCollection?.find().sort({createdAt: -1}).toArray()
    ]);

    if (!users || users.length === 0) {
      return reply.status(404).send({ error: 'Could not get users collection' });
    }

    if (!orders || orders.length === 0) {
      return reply.status(404).send({ error: 'Could not get orders collection' });
    }
    users.sort((a, b) => a.lastName.localeCompare(b.lastName, 'he'));
    // combine users with orders
    const usersWithOrders = users.map(user => {
      const userOrders = orders.filter(order => order.userId === user._id.toString());
      return { ...user, orders: userOrders };
    });

 
    return reply.status(200).send(usersWithOrders);
  } catch (error) {
    server.log.error('Error querying MongoDB:', error);
    return reply.status(500).send({ error: 'Internal Server Error', msg: error });
  }
});

  server.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // get id
      const { id } = request.params as { id: string };
      if(!id){
        return reply.status(404).send({ error: 'ERROR; no id was found' });
      }
      //get user
      const user = await usersCollection?.findOne({_id: new ObjectId(id)})
      return reply.status(200).send(user);
    } catch (error) {
      server.log.error('Error querying MongoDB:', error);
      return reply.status(500).send({ error: 'Internal Server Error', msg: error });
    }
  });



// POST: new user
server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // get user
    const userObj: IUser = await userSchema.parseAsync(request.body); 
    if(!userObj){
      return reply.status(401).send({msg: "Cannot parse user obj"}); 
    }
    const newUserObj = {
      ...userObj,
      createdAt: new Date()
    }
    const newUser = await usersCollection?.insertOne(newUserObj) 
    
    return reply.status(201).send({msg: "user saved", user: newUser}); 
  } catch (err) {
    return reply.status(500).send({err}); 
  }
});

  // // DELETE:user by ID
  server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // get id
      const { id } = request.params as { id: string };
      
      const result = await usersCollection?.deleteOne({ _id: new ObjectId(id) });
      console.log(result)
      // delete all orders with userId = id
      await ordersCollection?.deleteMany({userId: id.toString()})
      if (result?.deletedCount) {
        return reply.status(200).send({ msg: 'User deleted' });
      } else {
        return reply.status(404).send({ error: 'User not found' });
      }

    } catch (error) {
      server.log.error('Error querying MongoDB:', error);
      return reply.status(500).send({ error: 'Internal Server Error', msg: error });
    }
  });

  // // PUT: user by ID
  server.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const id = request.id as string;
      const updatedUser = request.body as any;
      const result = await usersCollection?.updateOne({ _id: id.toString() }, { $set: updatedUser });

      if (result?.matchedCount) {
        return reply.status(200).send({ msg: 'User updated successfully' });
      } else {
        return reply.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      server.log.error('Error querying MongoDB:', error);
      return reply.status(500).send({ error: 'Internal Server Error', msg: error });
    }
  });
};

export default usersRoute;