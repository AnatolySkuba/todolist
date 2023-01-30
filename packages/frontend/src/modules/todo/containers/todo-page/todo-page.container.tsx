import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';
import { HeaderComponent } from '../../../common/components/header';
import { todoService } from '../../service/todo.service';
import { TodoPageSwitcherComponent } from '../../components/todo-page-switcher/todo-page-switcher.component';
import { APP_KEYS } from '../../../common/consts';

export const TodoPageContainer = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { data, isLoading } = useQuery('todos', () => todoService.getTodoById(id));
  const todo = data?.data;

  const switchers: string[] | undefined = Object.values(APP_KEYS.SWITCHER_KEYS).slice(1);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <HeaderComponent />
      <Container>
        <Typography variant="h5" gutterBottom>
          {todo.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography gutterBottom>{todo.description}</Typography>
        {switchers?.map((switcher: string, index: number) => (
          <TodoPageSwitcherComponent
            key={index}
            todoId={todo._id}
            switcherName={switcher}
            switcherValue={!todo[switcher]}
          />
        ))}
        <Button variant="outlined" onClick={() => history.goBack()}>
          Back
        </Button>
      </Container>
    </>
  );
};
