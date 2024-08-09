import { createReducer, on } from '@ngrx/store';
import { UserType, UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';
import { addUserToStore, setCurrentUser, updateUserinStore } from './usersSlice.actions';
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

  on(updateUserinStore, (state: UsersState, { user }) => {
    console.log('Updating user in store:', user);
    const updatedUsers = state.allUsers.map(existingUser =>
      existingUser._id === user._id ? user : existingUser
    );

    return {
      ...state,
      allUsers: updatedUsers
    };
  }),
);