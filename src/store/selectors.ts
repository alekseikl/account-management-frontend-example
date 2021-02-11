import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.'

export const lastSubmitTime = (state: RootState) => state.transactions.lastSubmitTime

export const createTransactionState = (state: RootState) => state.transactions.create

export const recentTransactions = createSelector(
  (state: RootState) => state.transactions.submittedTransactions,
  (transactions) => {
    const reversed = [...transactions]

    reversed.reverse()
    return reversed
  }
)

export const failedTransactions = createSelector(
  (state: RootState) => state.transactions.failedTransactions,
  (failedTransactions) => {
    const reversed = [...failedTransactions.values()]

    reversed.reverse()
    return reversed
  }
)

