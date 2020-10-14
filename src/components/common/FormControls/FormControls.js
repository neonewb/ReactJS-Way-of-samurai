import React from 'react'
import { Field } from 'redux-form'
import Style from './FormControls.module.css'

const FormControl = ({ input, meta: {touched, error}, children }) => {
  const hasError = touched && error
  return (
    <div className={Style.formControl + ' ' + (hasError && Style.error)}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export const createField = (
  name,
  component,
  validators,
  placeholder,
  type,
  text = ''
) => (
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
