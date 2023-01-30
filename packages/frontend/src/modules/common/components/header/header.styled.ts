import { Box, styled } from '@mui/material';

export const BackDrop = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  visibility: ${({ dropdown }: { dropdown: string }) => (dropdown ? '' : 'hidden')};
`;
