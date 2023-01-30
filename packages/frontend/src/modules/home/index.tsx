import React from 'react';
import { Container } from '@mui/material';
import { AuthButtonComponent } from './components/auth-button.component';
import { AppWrapper, AppName, AuthLink } from './home.styled';

const HomePageContainer: () => JSX.Element = () => (
  <Container
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <AppWrapper textAlign="center">
      <AppName>Todo list</AppName>
      <AuthLink to="/login">
        <AuthButtonComponent>Login</AuthButtonComponent>
      </AuthLink>
      <AuthLink to="/register">
        <AuthButtonComponent>Register</AuthButtonComponent>
      </AuthLink>
    </AppWrapper>
  </Container>
);

export default HomePageContainer;
