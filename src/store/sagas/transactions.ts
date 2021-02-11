import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from "../../core/ApiError";
import { defaultHeaders } from "../../core/constants";
import endpoints from "../../core/endpoints";
import rest from "../../core/rest";
import { SubmittedTransaction, TransactionRequest } from "../../entities/Transactions";
import { BalanceApi } from "../../entities/TransactionsApi";
import * as actions from '../actions'
import * as selectors from '../selectors'

const DuplicateTransactionThreshold = 5000

export function* createTransaction({ payload }: PayloadAction<TransactionRequest>) {
  const transactionId = payload.transactionId ?? uuidv4()
  const lastSubmitTime: number = yield select(selectors.lastSubmitTime)
  const recentTransactions: SubmittedTransaction[] = yield select(selectors.recentTransactions)

  const duplicate = recentTransactions.find(
    (item) => item.accountId === payload.accountId && item.amount === payload.amount
  )

  if (
    duplicate &&
    (Date.now() - lastSubmitTime) < DuplicateTransactionThreshold
  ) {
    yield put(actions.createTransactionFailure({ 
      error: new Error('You need to wait for 5 seconds before sending a duplicate transaction.') 
    }))
    return
  }

  try {
    yield call(rest.post, endpoints.amount, {
      account_id: payload.accountId,
      amount: payload.amount
    }, {
      headers: {
        ...defaultHeaders,
        'Transaction-Id': transactionId
      }
    })

    const balanceResult: BalanceApi = yield call(rest.get, endpoints.balance(payload.accountId))

    yield put(actions.createTransactionSuccess({
      transaction: {
        transactionId,
        accountId: payload.accountId,
        amount: payload.amount,
        balance: balanceResult.balance
      },
      sentAt: Date.now()
    }))
  } catch (error) {
    const failedTransaction = error instanceof ApiError && error.isTransportError ? {
      ...payload,
      transactionId
    } : undefined

    yield put(actions.createTransactionFailure({ error, failedTransaction }))
  }
}

export default function* () {
  yield all([
    takeLatest(actions.createTransactionRequest, createTransaction)
  ])
}
