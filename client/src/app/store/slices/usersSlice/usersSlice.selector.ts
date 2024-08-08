import { createSelector } from '@ngrx/store';
import { AppStore } from '../../store';
import { UsersState } from './userSlice.reducer';
import { UserType, UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';

// get the users slice from the AppStore
export const selectUsersState = (state: AppStore) => state.users;

// get all users
export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState): UserTypeWithOrders[] => state.allUsers
);

// get the current user
export const selectCurrentUser = createSelector(
  selectUsersState,
  (state: UsersState): UserType => state.currentUser as UserType
);

export const selectCurrentUserName = createSelector(
  selectCurrentUser,
  (user: UserType): string => user ? `${user.firstName} ${user.lastName}` : ''
);

//  get a user by ID
export const selectUserById = (id: string) => createSelector(
  selectAllUsers,
  (users) => users.find(user => user._id === id)
);