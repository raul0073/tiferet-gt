import { ObjectId } from "@fastify/mongodb";
import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { balanceSchema, BalanceType, IBalance } from './../../../../shared/schemas/balanceSchema';
import { ITransaction, transactionSchema, TransactionType } from './../../../../shared/schemas/synagogueSchema';

const transactionRoute: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
    const db = server.mongo.db;
    const transactionsCollection = db?.collection('transactions');
    const balanceCollection = db?.collection('balances');

    // GET: Fetch all transaxtions
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
    //GET: get transaction by id
    server.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string };

            if (!ObjectId.isValid(id)) {
                return reply.status(400).send({ error: 'Invalid transaction ID format' });
            }

            const transaction = await transactionsCollection?.findOne({ _id: new ObjectId(id) });
            if (!transaction) {
                return reply.status(404).send({ error: 'Transaction not found' });
            }

            return reply.status(200).send(transaction);
        } catch (err) {
            server.log.error('Error querying MongoDB:', err);
            return reply.status(500).send({ error: 'Internal Server Error', msg: err });
        }
    });
    //POST: post new transaction and update balance
    server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // validate body

            const transObj: ITransaction = await transactionSchema.parseAsync(request.body);
            // check the balance change
            const balanceChange = transObj.actionType === 2 ? -transObj.amountPaid :
                transObj.actionType === 1 ? transObj.amountPaid : 0;

            // find the latest balance record
            const latestBalanceRecord = await balanceCollection?.findOne<BalanceType>(
                {},
                { sort: { createdAt: -1 } }
            );

            // calc diff
            const currentBalance = latestBalanceRecord?.balance ?? 0;
            const newBalance = currentBalance + balanceChange;

            // add transaction
            const newTransObj = await transactionsCollection?.insertOne(transObj)
            if (newTransObj) {
                const combaindeBalanceObj: IBalance = {
                    type: transObj.actionType,
                    transactionAmount: balanceChange,
                    balance: newBalance,
                    transactionId: newTransObj.insertedId.toString(),
                    createdAt: new Date()
                };
                const newBalanceResult = await balanceSchema.parseAsync(combaindeBalanceObj)
                const insertRes = await balanceCollection?.insertOne(newBalanceResult)
                return reply.status(200).send(insertRes);
            }

            // update balance
        } catch (err) {
            server.log.error('Error querying MongoDB:', err);
            return reply.status(500).send({ error: 'Internal Server Error', msg: err });
        }
    });

    //DELETE: delete transaction and reveret balance accordingly
    server.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string };
            // Validate the transaction ID
            if (!id) {
                return reply.status(400).send({ error: 'Transaction ID is required' });
            }

            // Find the transaction to be deleted
            const transactionToDelete = await transactionsCollection?.findOne<TransactionType>({ _id: new ObjectId(id) });
            if (!transactionToDelete) {
                return reply.status(404).send({ error: 'Transaction not found' });
            }

            // Determine the balance change to reverse
            const balanceChange = transactionToDelete.actionType === 2 ?
            transactionToDelete.amountPaid :
            transactionToDelete.actionType === 1 ?
            -transactionToDelete.amountPaid : 0;


            // Delete the transaction
            await transactionsCollection?.deleteOne({ _id: new ObjectId(id) });

            // Find the latest balance record
            const latestBalanceRecord = await balanceCollection?.findOne<BalanceType>(
                {},
                { sort: { createdAt: -1 } }
            );

            // Calculate the new balance by reversing the transaction
            const currentBalance = latestBalanceRecord?.balance ?? 0;
            const newBalance = currentBalance + balanceChange;


            const deletedBalance = await balanceCollection?.deleteOne({transactionId: id})


            const latestBalaceUpdate = await balanceCollection?.updateOne(
                { _id: latestBalanceRecord?._id },
                { $set: { balance: newBalance } }
            );


            return reply.status(200).send(latestBalaceUpdate);
        } catch (err) {
            server.log.error('Error deleting transaction:', err);
            return reply.status(500).send({ error: 'Internal Server Error', msg: err });
        }
    });
};

export default transactionRoute;