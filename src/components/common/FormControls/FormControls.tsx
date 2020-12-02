import React, { FC, ReactNode } from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorT } from '../../../utils/validators'
import Style from './FormControls.module.css'

type FormControlPropsT = {
  meta: WrappedFieldMetaProps
}

const FormControl: FC<FormControlPropsT> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error
  return (
    <div className={Style.formControl + ' ' + (hasError && Style.error)}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
  // const { input, meta, child, ...restProps } = props
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input: FC<WrappedFieldProps> = (props) => {
  // const { input, meta, child, ...restProps } = props
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export function createField<FieldKeysType extends string>(
  name: FieldKeysType,
  component: FC<WrappedFieldProps>,
  validators: Array<FieldValidatorT> | null,
  placeholder: string | undefined,
  type: string,
  text = ''
): ReactNode {
  return (
    <div>
      <Field
        name={name}
        component={component}
        validate={validators}
        placeholder={placeholder}
        type={type}
      />{' '}
      {text}
    </div>
  )
}
