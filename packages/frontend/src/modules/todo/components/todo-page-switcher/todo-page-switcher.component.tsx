import React from 'react';
import { Typography, Switch } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { todoService } from '../../service/todo.service';
import { QUERY_KEYS } from '../../../common/consts/app-keys.const';
import { StyledBox } from '../../../common/styles/common.style';

export const TodoPageSwitcherComponent = ({
  todoId,
  switcherName,
  switcherValue
}: {
  todoId: string;
  switcherName: string;
  switcherValue: boolean;
}) => {
  const queryClient = useQueryClient();

  const updateTodo = useMutation({
    mutationFn: ({ id, name, value }: { id: string; name: string; value: boolean }) =>
      todoService.updateTodo(id, name, value),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    }
  });

  const name = switcherName.slice(2);

  return (
    <StyledBox>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Switch
        checked={!switcherValue}
        onChange={() => {
          updateTodo.mutate({
            id: todoId,
            name: switcherName,
            value: switcherValue
          });
        }}
      />
    </StyledBox>
  );
};
