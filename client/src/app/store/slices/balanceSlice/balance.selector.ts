import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStore } from '../../store';
import { BalanceState } from './balance.reducer';
import { BalanceType } from '../../../../../../shared/schemas/balanceSchema';


export const selectBalanceState = (state: AppStore) => state.balance;
// Get the balance
export const selectBalance = createSelector(
    selectBalanceState,
    (state: BalanceState): BalanceType => state.balance
  );

