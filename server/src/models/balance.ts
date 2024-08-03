import mongoose, {Schema} from 'mongoose'

const balanceSchema = new Schema({
    type: Number, // 1 income / 2 out
    transactionId:String,
    paidTo: String,
    transactionAmount: Number, 
    balance: Number,
}, {
    timestamps: true
},
)

const Balance = mongoose.models.balance || mongoose.model("balance", balanceSchema)
export default Balance


