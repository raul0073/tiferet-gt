import mongoose, {Schema} from 'mongoose'
import { IUser } from '../../../shared/schemas/userSchema'

const userSchema: Schema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    hasAccess: Boolean,
    hasDebt: Boolean,
    balance: Number,

}, {
    timestamps: true
},
)

const User = mongoose.models['users']|| mongoose.model("users", userSchema)
export default User



export type UserType = {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    hasAccess: boolean,
    hasDebt: boolean,
    balance: number,
    createdAt: Date,
}