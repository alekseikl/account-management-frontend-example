import { Field, Form } from "formik";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`

export const PageTitle = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 24px;
`

export const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`
export const WarningMessage = styled.div`
  width: 460px;
  margin-bottom: 16px;
  color: red;
`

export const StyledForm = styled(Form)`
  width: 460px;
  padding: 24px;
  border: solid 1px #0071EE;
  border-radius: 10px;
  margin-bottom: 52px;
`

export const FieldContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 4px;
`

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.label`
  color: #0071EE;
  margin-right: 8px;
  height: 21px;
`

export const StyledField = styled(Field)`
  flex: 1;
  height: 21px;
  margin-bottom: 2px;
`

export const FieldError = styled.div`
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  color: red;
`

export const TransactionCellContainer = styled.div`
  width: 600px;
  padding: 24px;
  border: solid 1px lightgray;
  border-radius: 10px;
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 18px;

  p {
    margin: 0;
  }

  p:not(:last-child) {
    margin-bottom: 16px;
  }
`