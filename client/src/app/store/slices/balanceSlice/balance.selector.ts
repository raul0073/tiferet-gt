import { createSelector } from '@ngrx/store';
import { BalanceType } from '../../../../../../shared/schemas/balanceSchema';
import { AppStore } from '../../store';
import { BalanceState } from './balance.reducer';


export const selectBalanceState = (state: AppStore) => state.balance;
// Get the balance
export const selectBalance = createSelector(
    selectBalanceState,
    (state: BalanceState): BalanceType => state.balance
  );

