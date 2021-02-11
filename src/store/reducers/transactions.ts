import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseError } from "../../core/ApiError";
import { SubmittedTransaction, Transaction, TransactionRequest } from "../../entities/Transactions";

interface State {
  create: {
    pending: boolean;
    error: BaseError | null;
    succeeded: boolean;
    reSending: boolean;
  },
  submittedTransactions: SubmittedTransaction[];
  failedTransactions: Map<string, Transaction>;
  lastSubmitTime: number;
}
interface TransactionSuccessPayload {
  transaction: SubmittedTransaction;
  sentAt: number;
}

interface TransactionFailurePayload {
  failedTransaction?: Transaction;
  error: BaseError;
}

const initialState: State = {
  create: {
    pending: false,
    error: null,
    succeeded: false,
    reSending: false
  },
  submittedTransactions: [],
  failedTransactions: new Map(),
  lastSubmitTime: 0
}

export default createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    createTransactionRequest(state, { payload }: PayloadAction<TransactionRequest>) {
      state.create.pending = true;
      state.create.error = null;
      state.create.succeeded = false;
      state.create.reSending = !!payload.transactionId;
    },
    createTransactionSuccess(state, { payload: { transaction, sentAt } }: PayloadAction<TransactionSuccessPayload>) {
      state.create.pending = false;
      state.create.succeeded = true;
      state.submittedTransactions.push(transaction);
      state.failedTransactions.delete(transaction.transactionId);
      state.lastSubmitTime = sentAt;
    },
    createTransactionFailure(state, { payload: { failedTransaction, error } }: PayloadAction<TransactionFailurePayload>) {
      state.create.pending = false;
      state.create.error = error;

      if (failedTransaction) {
        state.failedTransactions.set(failedTransaction.transactionId, failedTransaction);
      }
    }
  }
})