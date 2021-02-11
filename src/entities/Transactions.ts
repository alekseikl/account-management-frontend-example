export interface TransactionRequest {
  transactionId?: string;
  accountId: string;
  amount: number;
}

export interface Transaction {
  transactionId: string;
  accountId: string;
  amount: number;
}

export interface SubmittedTransaction extends Transaction {
  balance: number;
}
