import styled from 'styled-components';
import { Box } from '@mui/material';
import { MARGINS } from '../../theme';

export const StyledBox = styled(Box)`
  margin: ${MARGINS.styledBox};
  display: flex;
  justify-content: space-between;
`;
