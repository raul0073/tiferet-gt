import { UserType } from '../../../../../../server/src/models/users';
import { createReducer, on } from '@ngrx/store';
import { addUserToStore, setCurrentUser } from './usersSlice.actions';
export interface UsersState {
  allUsers: UserType[];    // Array to hold all users
  currentUser: UserType | null; // Object to hold the current logged-in user
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