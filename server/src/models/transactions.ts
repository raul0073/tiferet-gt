import mongoose, {Schema} from 'mongoose'

const houseTransactions = new Schema({

    actionType: Number, // 1 for in 2 for out
    paymentType: String,
    checkNo: String,
    amountPaid: Number, 
    expenseType: String,
    paidTo: String,
}, {
    timestamps: true
},
)

const Transactions = mongoose.models.transactions || mongoose.model("transactions", houseTransactions)
export default Transactions