import React from 'react';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';
import { SIZES, WEIGHTS } from '../../../theme/fonts.const';

export const TodoCard = ({ todo, needHeight }: { todo: ITodo; needHeight?: boolean }) => (
  <Card sx={{ width: '100%', height: `${needHeight && '100%'}` }}>
    <CardContent>
      <Typography sx={{ fontSize: SIZES.l, fontWeight: WEIGHTS.bold }} gutterBottom>
        {todo.title}
      </Typography>
      <Typography color="text.secondary">{todo.description}</Typography>
    </CardContent>
    <CardActions>
      <TodoActionsComponent todoItem={todo} />
    </CardActions>
  </Card>
);
