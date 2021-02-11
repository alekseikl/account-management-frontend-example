import React, { FC, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup';
import { PageContainer, PageTitle, SectionTitle, TransactionCellContainer } from './styles'
import TransactionForm from './TransactionForm'
import * as selectors from '../store/selectors'
import * as actions from '../store/actions'
interface Values {
  accountId: string;
  amount: string;
}

const initialValues: Values = {
  accountId: '',
  amount: ''
}

const schema = yup.object().shape({
  accountId: yup.string().required('Field is required').uuid('Invalid Account ID value'),
  amount: yup
    .string()
    .required('Field is required')
    .matches(/^[-+]?\d+$/, 'Invalid Amount value')
    .test('Not zero', 'Value should not be zero', (value) => parseInt(value ?? '', 10) !== 0)
})

const TransactionsPage: FC = () => {
  const dispatch = useDispatch();
  const { pending, error } = useSelector(selectors.createTransactionState);
  const recentTransactions = useSelector(selectors.recentTransactions)

  const handleSubmit = useCallback((values: Values) => {
    dispatch(actions.createTransactionRequest({
      accountId: values.accountId,
      amount: parseInt(values.amount)
    }))
  }, [])

  return (
    <PageContainer>
      <PageTitle>Account Management App</PageTitle>
      <SectionTitle>Submit new transaction</SectionTitle>
      <Formik 
        initialValues={initialValues} 
        validationSchema={schema} 
        validateOnChange={false} 
        onSubmit={handleSubmit}
      >
        <TransactionForm pending={pending} error={error} />
      </Formik>
      <SectionTitle>Recently submitted transactions</SectionTitle>
      {recentTransactions.map((transaction) => (
        <TransactionCellContainer 
          key={transaction.transactionId}
          data-type="transaction"
          data-account-id={transaction.accountId}
          data-amount={transaction.amount}
          data-balance={transaction.balance}
        >
          <p>
            {
              transaction.amount < 0 ? 
              <span><strong>Withdrew ${Math.abs(transaction.amount)}</strong> from </span> : 
              <span><strong>Transferred ${Math.abs(transaction.amount)}</strong> to </span> 
            }
            <strong>{transaction.accountId}.</strong>
          </p>
          <p>
            Current <strong>{transaction.accountId}</strong>'s balance is
            <strong> {transaction.balance < 0 ? '-' : ''}${Math.abs(transaction.balance)}.</strong>

          </p>
        </TransactionCellContainer>
      ))}
    </PageContainer>
  )
} 

export default memo(TransactionsPage)
