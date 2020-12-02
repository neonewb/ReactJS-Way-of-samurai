export type FieldValidatorT = (value: string) => string | undefined

export const requiredField: FieldValidatorT = (value) => {
  if (value) return undefined
  return 'Field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorT => (value) => {
  if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
  return undefined
}
