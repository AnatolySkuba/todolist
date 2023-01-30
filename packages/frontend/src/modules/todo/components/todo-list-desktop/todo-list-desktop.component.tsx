import React from 'react';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Pagination
} from '@mui/material';
import { ITodo } from '../../types/todo.type';
import {
  StyledHeadTableCell,
  StyledTable,
  StyledTableCell,
  StyledTableRow
} from './todo-list-desktop.styled';
import { TodoActionsComponent } from '../todo-actions';
import { FilterButtonsComponent } from '../filter-buttons';
import { FilterInputComponent } from '../filter-input';
import { StyledBox } from '../../../common/styles/common.style';

export const TodoListDesktopComponent = ({
  todos,
  setStatus,
  setSearch,
  setPage,
  page,
  countPages
}: {
  todos: ITodo[];
  setStatus: Function;
  setSearch: Function;
  setPage: Function;
  page: number;
  countPages: number;
}) => (
  <Container>
    <StyledBox>
      <FilterButtonsComponent setStatus={setStatus} setPage={setPage} />
      <FilterInputComponent setSearch={setSearch} setPage={setPage} />
    </StyledBox>
    <TableContainer component={Paper} style={{ maxHeight: '80vh' }}>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            <StyledHeadTableCell width="20%">Todo Title</StyledHeadTableCell>
            <StyledHeadTableCell width="60%" align="left">
              Description
            </StyledHeadTableCell>
            <StyledHeadTableCell align="center">Actions</StyledHeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos?.map((todo: ITodo) => (
            <StyledTableRow key={todo._id}>
              <StyledTableCell width="20%" component="th" scope="row">
                {todo.title}
              </StyledTableCell>
              <StyledTableCell width="60%" component="th" scope="row">
                {todo.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <TodoActionsComponent todoItem={todo} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
    <Pagination
      page={page}
      onChange={(_, newPage: number) => setPage(newPage)}
      count={countPages}
      variant="outlined"
      shape="rounded"
    />
  </Container>
);
