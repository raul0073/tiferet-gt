import mongoose, {Schema} from 'mongoose'

const donersSchema = new Schema({
    fullName: String,
    amountDonated: Number,
    contact: String

}, {
    timestamps: true
},
)

const Doners = mongoose.models.doners || mongoose.model("doners", donersSchema)
export default Doners