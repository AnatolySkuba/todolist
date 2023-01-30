import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { PADDINGS } from '../../../theme';

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  overflow: hidden;
  left: 0;
  padding: ${PADDINGS.styledSwiper};
`;
