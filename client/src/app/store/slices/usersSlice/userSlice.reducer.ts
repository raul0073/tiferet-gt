import { createReducer, on } from '@ngrx/store';
import { addUserToStore, setCurrentUser } from './usersSlice.actions';
import { UserType } from '../../../../../../shared/schemas/userSchema';
export interface UsersState {
  allUsers: UserType[];   
  currentUser: UserType | null; 
}

export const initialUsersState: UsersState = {
  allUsers: [],
  currentUser: null,
};


export const usersReducer = createReducer(
  initialUsersState,
  on(addUserToStore, (state: UsersState, { user }) => ({
    ...state,
    allUsers: [...state.allUsers, user]
  })),
  on(setCurrentUser, (state: UsersState, { user }) => ({
    ...state,
    currentUser: user
  }))
);