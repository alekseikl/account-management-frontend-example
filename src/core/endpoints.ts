export default {
  amount: '/amount',
  balance: (accountId: string) => `/balance/${accountId}`,
  transaction: (transactionId: string) => `/transaction/${transactionId}`
}