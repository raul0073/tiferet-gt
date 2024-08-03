import mongoose, {Schema} from 'mongoose'

const ordersSchema = new Schema({
    name: [],
    userId: String,
    parasha: String,
    price: Number,
    pricePaid: Number,
    beenPaid: Boolean,
    orderInvoice: String

}, {
    timestamps: true
},
)

const Order = mongoose.models.orders || mongoose.model("orders", ordersSchema)
export default Order