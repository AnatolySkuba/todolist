import React from 'react';
import { Container, Grid, Button } from '@mui/material';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { profileFormSchema } from '../../../common/schemas/yup-validation.schema';
import { IProfileForm } from '../../types/profile-form.type';
import { FormTextField } from '../../components/formTextField';
import { LogoutButton } from './profile-page.styled';
import { userService } from '../../service/user.service';
import { APP_KEYS } from '../../../common/consts';

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
export function ProfilePageContainer() {
  const history = useHistory();

  const logoutUser = useMutation({
    mutationFn: (id: string) => userService.logoutUser(id),
    onSuccess: () => {
      history.push(APP_KEYS.ROUTER_KEYS.ROOT);
      localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
      localStorage.removeItem(APP_KEYS.STORAGE_KEYS.USER_ID);
    }
  });

  const handleLogout = () => {
    const userId = localStorage.getItem(APP_KEYS.STORAGE_KEYS.USER_ID);
    if (userId) {
      logoutUser.mutate(userId);
    }
  };

  const updatePassword = useMutation({
    mutationFn: (body: { email: string; oldPassword: string; newPassword: string }) =>
      userService.updatePassword(body)
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
          oldPassword: '',
          newPassword: ''
        }}
        validationSchema={profileFormSchema}
        onSubmit={(values: IProfileForm, formikHelpers: FormikHelpers<IProfileForm>) => {
          updatePassword.mutate(values);
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<IProfileForm>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field name="email" id="Email" size="small" component={FormTextField} />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="oldPassword"
                  id="Old password"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="newPassword"
                  id="New password"
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
      <LogoutButton variant="outlined" onClick={() => handleLogout()}>
        Logout
      </LogoutButton>
    </Container>
  );
}
