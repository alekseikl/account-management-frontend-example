import { ErrorMessage } from 'formik'
import React, { FC, memo } from 'react'
import { FieldContainer, InputLabel, StyledField, FieldError, InputWrapper } from './styles' 

interface Props {
  type: string;
  name: string;
  label: React.ReactNode;
  dataType?: string;
}

const InputField: FC<Props> = ({ type, name, label, dataType }) => (
  <FieldContainer>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <InputWrapper>
      <StyledField type={type} id={name} name={name} data-type={dataType} />
      <FieldError>
        <ErrorMessage name={name} component="span" />
      </FieldError>
    </InputWrapper>
  </FieldContainer>
) 

export default memo(InputField)
