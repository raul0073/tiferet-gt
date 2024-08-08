import { createAction, props } from '@ngrx/store';
import { BalanceType } from '../../../../../../shared/schemas/balanceSchema';

export const updateBalance = createAction(
  '[Balance] Update Balance',
  props<{ balance: BalanceType }>()
);