import { createAction, props } from '@ngrx/store';
import { UserType } from '../../../../../../server/src/models/users';

export const addUserToStore = createAction(
  '[Users] Add User to Store',
  props<{ user: UserType }>()
);

export const setCurrentUser = createAction(
  '[Users] Set Current User',
  props<{ user: UserType }>()
);