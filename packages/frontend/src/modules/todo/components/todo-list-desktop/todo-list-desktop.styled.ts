import { Table, TableCell, TableRow, styled } from '@mui/material';
import { PADDINGS, COLORS, FONTS } from '../../../theme';

export const StyledTable = styled(Table)`
  border: 1px solid ${COLORS.black};
`;

export const StyledHeadTableCell = styled(TableCell)`
  padding: ${PADDINGS.styledHeadTableCell};
  background-color: ${COLORS.secondary};
  border-right: 1px solid ${COLORS.black};
  border-left: 1px solid ${COLORS.black};
  font-size: ${FONTS.SIZES.m};
  font-weight: ${FONTS.WEIGHTS.m};
`;

export const StyledTableCell = styled(TableCell)`
  padding: ${PADDINGS.styledTableCell};
  border-right: 1px solid ${COLORS.black};
  border-left: 1px solid ${COLORS.black};
`;

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}));
