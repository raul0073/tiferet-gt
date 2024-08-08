import { createReducer, on } from '@ngrx/store';
import { addUserToStore, setCurrentUser } from './usersSlice.actions';
import { UserType, UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';
export interface UsersState {
  allUsers: UserTypeWithOrders[];   
  currentUser: UserType | null; 
}

export const initialUsersState: UsersState = {
  allUsers: [],
  currentUser: null,
};


export const usersReducer = createReducer(
  initialUsersState,
  on(addUserToStore, (state: UsersState, { user }) => {
    // if the user is already in the state
    const userExists = state.allUsers.some(existingUser => existingUser._id === user._id);
    if (userExists) {
      return state;
    }
    //else
    return {
      ...state,
      allUsers: [...state.allUsers, user]
    };
  }),
  on(setCurrentUser, (state: UsersState, { user }) => ({
    ...state,
    currentUser: user
  })),
);