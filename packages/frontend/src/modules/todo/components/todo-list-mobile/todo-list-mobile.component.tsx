import React, { useEffect, useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Container } from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { TodoCard } from '../todo-card';
import { FilterButtonsComponent } from '../filter-buttons';
import { FilterInputComponent } from '../filter-input';
import { StyledSwiper } from '../todo-list-tablet/todo-list-tablet.styled';
import { APP_KEYS } from '../../../common/consts';

export const TodoListMobileComponent = ({
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

  const screenHeightRef = useRef(document.documentElement.scrollHeight);

  const countPages = Math.ceil(count / APP_KEYS.QUERY_KEYS.LIMIT);

  return (
    <Container>
      <FilterInputComponent setSearch={setSearch} setPage={setPage} />
      <FilterButtonsComponent setStatus={setStatus} setPage={setPage} />
      <StyledSwiper
        direction="vertical"
        onInit={() => {
          setPage(1);
        }}
        onReachEnd={() => {
          setPage((prevValue: number) => (prevValue < countPages ? prevValue + 1 : prevValue));
        }}
        grabCursor
        height={screenHeightRef.current - 100}
        slidesPerView="auto"
      >
        {allTodos?.map((todo: ITodo, index: number) => (
          <SwiperSlide
            data-history={index}
            style={{
              height: 'auto'
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

// import React from 'react';
// import { Container } from '@mui/material';
// import { ITodo } from '../../types/todo.type';
// import { TodoCard } from '../todo-card/todo-card.component';
// import { FilterInputComponent } from '../filter-input';
// import { FilterButtonsComponent } from '../filter-buttons';

// export const TodoListMobileComponent = ({
//   todos,
//   setStatus,
//   setSearch,
//   setPage
// }: {
//   todos: ITodo[];
//   setStatus: Function;
//   setSearch: Function;
//   setPage: Function;
// }) => (
//   <Container>
//     <FilterInputComponent setSearch={setSearch} setPage={setPage} />
//     <FilterButtonsComponent setStatus={setStatus} setPage={setPage} />
//     {todos?.map((todo: ITodo) => (
//       <TodoCard key={todo._id} todo={todo} />
//     ))}
//   </Container>
// );
