import React from 'react';
import { AuthButton } from './auth-button.styled';

export const AuthButtonComponent = ({ children }: { children: string }) => (
  <AuthButton variant="outlined">{children}</AuthButton>
);
