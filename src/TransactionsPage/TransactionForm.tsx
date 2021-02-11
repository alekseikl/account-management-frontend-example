import { useFormikContext } from 'formik'
import React, { FC, memo } from 'react'
import { BaseError } from '../core/ApiError'
import useOnChange from '../hooks/useOnChange'
import InputField from './InputField'
import { StyledForm, WarningContainer } from "./styles"

interface Props {
  pending: boolean;
  error: BaseError | null;
}

const TransactionForm: FC<Props> = ({
  pending, 
  error
}) => {
  const formik = useFormikContext()

  useOnChange(() => {
    if (!pending && formik.isSubmitting) {
      formik.setSubmitting(false)
      formik.resetForm()
    }
  }, [pending])

  return (
    <>
      <WarningContainer>
        {error && <span data-type="warning-message">{error.message}</span>}
      </WarningContainer>
      <StyledForm data-type="transaction-form">
        <InputField type="text" name="accountId" label="Account ID:" dataType="account-id" />
        <InputField type="text" name="amount" label="Amount:" dataType="amount" />
        <div>
          <button type="submit" disabled={pending}>Submit</button>
        </div>
      </StyledForm>
    </>
  )
}

export default memo(TransactionForm)
