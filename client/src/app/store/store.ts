import { UsersState } from "./slices/usersSlice/userSlice.reducer";


export interface AppStore {
    users: UsersState
}