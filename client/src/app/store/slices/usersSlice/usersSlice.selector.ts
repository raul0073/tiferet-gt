import { createSelector } from '@ngrx/store';
import { AppStore } from '../../store';
import { UsersState } from './userSlice.reducer';

// Selector to get the users slice from the AppStore
export const selectUsersState = (state: AppStore) => state.users;

// Selector to get all users
export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.allUsers
);

// Selector to get the current user
export const selectCurrentUser = createSelector(
  selectUsersState,
  (state: UsersState) => state.currentUser
);

// Selector to get a user by ID
export const selectUserById = (id: string) => createSelector(
  selectAllUsers,
  (users) => users.find(user => user._id === id)
);