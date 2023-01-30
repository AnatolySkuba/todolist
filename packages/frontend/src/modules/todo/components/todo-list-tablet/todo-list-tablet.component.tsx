import React, { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Container } from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { TodoCard } from '../todo-card';
import { StyledBox } from '../../../common/styles/common.style';
import { FilterButtonsComponent } from '../filter-buttons';
import { FilterInputComponent } from '../filter-input';
import { StyledSwiper } from './todo-list-tablet.styled';

export const TodoListTabletComponent = ({
  todos,
  setStatus,
  setSearch,
  setPage,
  search,
  status,
  count
}: {
  todos: ITodo[];
  setStatus: Function;
  setSearch: Function;
  setPage: Function;
  search: string;
  status: string;
  count: number;
}) => {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);

  useEffect(() => {
    setSwiperActiveIndex(0);
    setAllTodos([]);
  }, [search, status]);

  useEffect(() => {
    if (swiperActiveIndex === allTodos.length - 1 && swiperActiveIndex < count - 1) {
      setPage((prevPage: number) => prevPage + 1);
    }
  }, [swiperActiveIndex]);

  useEffect(() => {
    setAllTodos((prevTodos) => [...prevTodos, ...todos]);
  }, [todos]);

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <StyledBox>
        <FilterButtonsComponent setStatus={setStatus} setPage={setPage} />
        <FilterInputComponent setSearch={setSearch} setPage={setPage} />
      </StyledBox>
      <StyledSwiper
        effect="coverflow"
        onSlideChange={(swiper) => setSwiperActiveIndex(swiper.activeIndex)}
        autoHeight
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        modules={[EffectCoverflow]}
      >
        {allTodos?.map((todo: ITodo, index: number) => (
          <SwiperSlide
            data-history={index}
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '300px'
            }}
            key={index}
          >
            <TodoCard todo={todo} needHeight />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  );
};
