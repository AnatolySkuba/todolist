import React from 'react';
import { Grid, Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { addTodoFormSchema } from '../../../common/schemas/yup-validation.schema';
import { IAddTodoForm } from '../../types/add-todo-form.type';
import { FormTextField } from '../../../user/components/formTextField';
import { StyledContainerAddTodo } from './add-todo.styled';
import { todoService } from '../../service/todo.service';
import { APP_KEYS } from '../../../common/consts';

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
export function AddTodoComponent({
  setDropdown
}: {
  setDropdown: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  const switchers = Object.values(APP_KEYS.SWITCHER_KEYS).slice(1);
  const addTodo = useMutation({
    mutationFn: (newTodo: IAddTodoForm) => todoService.addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    }
  });

  return (
    <StyledContainerAddTodo>
      <Formik
        initialValues={{
          title: '',
          description: '',
          isComplete: false,
          isPrivate: false,
          isPublic: false
        }}
        validationSchema={addTodoFormSchema}
        onSubmit={(newTodo: IAddTodoForm, formikHelpers: FormikHelpers<IAddTodoForm>) => {
          const userId = localStorage.getItem(APP_KEYS.STORAGE_KEYS.USER_ID);
          if (userId) {
            addTodo.mutate({ ...newTodo, _id: userId });
          }
          formikHelpers.setSubmitting(false);
          setDropdown('');
        }}
      >
        {(formikProps: FormikProps<IAddTodoForm>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field name="title" id="Title" size="small" component={FormTextField} />
              </Grid>
              <Grid item xs={12}>
                <Field name="description" id="Description" size="small" component={FormTextField} />
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  {switchers.map((switcher, index) => (
                    <FormControlLabel
                      key={index}
                      name={switcher}
                      label={switcher.slice(2)}
                      control={
                        <Field>
                          {({ field }: FieldProps) => <Checkbox checked={field.value} {...field} />}
                        </Field>
                      }
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={12} sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => setDropdown('')}
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </StyledContainerAddTodo>
  );
}
