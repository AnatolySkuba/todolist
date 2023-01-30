import React from 'react';
import { Container, Grid, Button } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { registerFormSchema } from '../../../common/schemas/yup-validation.schema';
import { IRegisterForm } from '../../types/register-form.type';
import { FormTextField } from '../../components/formTextField';
import { userService } from '../../service/user.service';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';
import { IUser } from '../../types/user.type';
import { APP_KEYS } from '../../../common/consts';

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
export function RegisterPageContainer() {
  const history = useHistory();
  const queryClient = useQueryClient();

  const registerUser = useMutation({
    mutationFn: (newUser: IUser) => userService.registerUser(newUser),
    onSuccess: ({ email }) => {
      if (email) {
        history.push(APP_KEYS.ROUTER_KEYS.LOGIN);
      }
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
    }
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '450px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={registerFormSchema}
        onSubmit={(values: IRegisterForm, formikHelpers: FormikHelpers<IRegisterForm>) => {
          const { email, password } = values;
          registerUser.mutate({ email, password });
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<IRegisterForm>) => (
          <Form autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field name="email" id="Email" size="small" component={FormTextField} />
              </Grid>
              <Grid item xs={12}>
                <Field name="password" id="Password" size="small" component={FormTextField} />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="confirmPassword"
                  id="Confirm password"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => history.goBack()}
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
    </Container>
  );
}
