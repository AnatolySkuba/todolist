import React from 'react';
import { Box, Switch, Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { SPACES } from '../../../theme';
import { APP_KEYS } from '../../../common/consts';
import { ITodo } from '../../types/todo.type';
import { todoService } from '../../service/todo.service';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';

export const TodoActionsComponent = ({ todoItem }: { todoItem: ITodo }) => {
  const switcher = APP_KEYS.SWITCHER_KEYS.IS_COMPLETE;
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    }
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, name, value }: { id: string; name: string; value: boolean }) =>
      todoService.updateTodo(id, name, value),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    }
  });

  const link = `${APP_KEYS.ROUTER_KEYS.TODO}/${todoItem._id}`;

  return (
    <Box sx={{ display: 'flex', gap: SPACES.m, alignItems: 'center' }}>
      <Button variant="outlined" size="small" href={link}>
        View
      </Button>
      <Button variant="outlined" size="small" onClick={() => deleteTodo.mutate(todoItem._id)}>
        Delete
      </Button>
      <Switch
        checked={todoItem.isComplete}
        onChange={() => {
          updateTodo.mutate({
            id: todoItem._id,
            name: switcher,
            value: !todoItem.isComplete
          });
        }}
      />
    </Box>
  );
};
