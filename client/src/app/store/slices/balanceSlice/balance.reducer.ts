import { createReducer, on } from '@ngrx/store';
import { BalanceType } from '../../../../../../shared/schemas/balanceSchema';
import { updateBalance } from './balance.actions';

export interface BalanceState {
  balance: BalanceType
}

export const initialBalanceState: BalanceState = {
  balance: {} as BalanceType
};


export const balanceReducer = createReducer(
  initialBalanceState,
  on(updateBalance, (state: BalanceState, { balance }) => ({
    ...state,
    balance: balance
  })),
);