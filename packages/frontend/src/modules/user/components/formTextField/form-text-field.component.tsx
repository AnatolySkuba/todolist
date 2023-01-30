import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextFieldProps, TextField } from '@material-ui/core';
import { TextFieldInputLabel } from './form-text-field.styled';

/**
 * Material TextField Component with Formik Support including Errors.
 * Intended to be specified via the `component` prop in a Formik <Field> or <FastField> component.
 * Material-UI specific props are passed through.
 */
export const FormTextField: React.FC<FieldProps & TextFieldProps> = (props) => {
  const { error, helperText, field, form, id, ...rest } = props;
  const { touched, errors } = form;
  const { name } = field;

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  return (
    <>
      <TextFieldInputLabel>{id}</TextFieldInputLabel>
      <TextField
        variant="outlined"
        fullWidth
        InputLabelProps={{ variant: 'standard' }}
        error={error ?? Boolean(isTouched && errorMessage)}
        helperText={helperText ?? (isTouched && errorMessage ? errorMessage : undefined)}
        {...rest}
        {...field}
      />
    </>
  );
};
