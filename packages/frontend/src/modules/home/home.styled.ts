import styled from 'styled-components';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { MARGINS, FONTS } from '../theme';

export const AppWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const AuthLink = styled(Link)`
  margin: ${MARGINS.authLink};
  text-decoration-line: none;
`;

export const AppName = styled.h1`
  margin: ${MARGINS.appName};
  font-family: ${FONTS.FAMILIES.normal};
`;
