import styled from 'styled-components';
import { PADDINGS, COLORS } from '../../../theme';

export const StyledContainerAddTodo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  padding: ${PADDINGS.styledContainerAddTodo};
  background-color: ${COLORS.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 10;
`;
