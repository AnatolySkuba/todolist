import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import Breakpoint from '../../../common/hooks/breakpoints.hook';
import { HeaderComponent } from '../../../common/components/header';
import { TodoListDesktopComponent } from '../../components/todo-list-desktop';
import { TodoListTabletComponent } from '../../components/todo-list-tablet';
import { TodoListMobileComponent } from '../../components/todo-list-mobile';
import { todoService } from '../../service/todo.service';
import { ITodo } from '../../types/todo.type';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';
import { APP_KEYS } from '../../../common/consts';

export const TodoListPageContainer = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const history = useHistory();

  const { data, isLoading, refetch } = useQuery(`${QUERY_KEYS.TODOS}`, () =>
    todoService.getAllTodo(search, status, page)
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append(`${QUERY_KEYS.SEARCH}`, search);
    if (status) params.append(`${QUERY_KEYS.STATUS}`, status);
    if (page) params.append(`${QUERY_KEYS.PAGE}`, String(page));
    history.push({ search: params.toString() });
    refetch();
  }, [search, status, page]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { todos, count }: { todos: ITodo[]; count: number } = data?.data || undefined;

  const countPages = Math.ceil(count / APP_KEYS.QUERY_KEYS.LIMIT);
  const todoListDesktopProps = {
    todos,
    setStatus,
    setSearch,
    setPage,
    page,
    countPages
  };

  const todoListTabletProps = {
    todos,
    setStatus,
    setSearch,
    setPage,
    search,
    status,
    count
  };

  return (
    <>
      <HeaderComponent />
      <Breakpoint at="sm">
        {/* <TodoListMobileComponent
          todos={todos}
          setStatus={setStatus}
          setSearch={setSearch}
          setPage={setPage}
        /> */}
        <TodoListMobileComponent {...todoListTabletProps} />
      </Breakpoint>
      <Breakpoint at="md">
        <TodoListTabletComponent {...todoListTabletProps} />
      </Breakpoint>
      <Breakpoint at="lg">
        <TodoListDesktopComponent {...todoListDesktopProps} />
      </Breakpoint>
    </>
  );
};
