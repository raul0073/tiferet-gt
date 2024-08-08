import { BalanceState } from "./slices/balanceSlice/balance.reducer";
import { UsersState } from "./slices/usersSlice/userSlice.reducer";


export interface AppStore {
    users: UsersState
    balance: BalanceState
}