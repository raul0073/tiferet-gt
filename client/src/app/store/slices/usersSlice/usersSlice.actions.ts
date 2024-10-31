import { createAction, props } from '@ngrx/store';
import { UserType, UserTypeWithOrders } from '../../../../../../shared/schemas/userSchema';

export const addUserToStore = createAction(
  '[Users] Add User to Store',
  props<{ user: UserTypeWithOrders }>()
);

export const setCurrentUser = createAction(
  '[Users] Set Current User',
  props<{ user: UserType }>()
);
export const updateUserinStore = createAction(
  '[Users] Update User',
  props<{ user: UserTypeWithOrders }>()
);
export const deleteUserStore = createAction(
  '[Users] Delete User',
  props<{ userId: string }>()
);


export const updateOrderInvoice = createAction(
  '[Users] Update Order Invoice',
  props<{ orderId: string; orderInvoice: string }>()
);