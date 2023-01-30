import React from 'react';
import { Container, Grid, Button } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { loginFormSchema } from '../../../common/schemas/yup-validation.schema';
import { ILoginForm } from '../../types/login-form.type';
import { FormTextField } from '../../components/formTextField';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';
import { IUser } from '../../types/user.type';
import { userService } from '../../service/user.service';
import { APP_KEYS } from '../../../common/consts';

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
export function LoginPageContainer() {
  const history = useHistory();
  const queryClient = useQueryClient();

  const loginUser = useMutation({
    mutationFn: (user: IUser) => userService.loginUser(user),
    onSuccess: ({ id, token }) => {
      if (token.token) {
        localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token.token);
        localStorage.setItem(APP_KEYS.STORAGE_KEYS.USER_ID, id);
        history.push(APP_KEYS.ROUTER_KEYS.TODO_LIST);
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
          password: ''
        }}
        validationSchema={loginFormSchema}
        onSubmit={(values: ILoginForm, formikHelpers: FormikHelpers<ILoginForm>) => {
          const { email, password } = values;
          loginUser.mutate({ email, password });
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<ILoginForm>) => (
          <Form autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field name="email" id="Email" size="small" component={FormTextField} />
              </Grid>
              <Grid item xs={12}>
                <Field name="password" id="Password" size="small" component={FormTextField} />
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
