import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import { BackDrop } from './header.styled';
import { AddTodoComponent } from '../../../todo/components/add-todo';
import { StyledBox } from '../../styles/common.style';

export const HeaderComponent = () => {
  const [dropdown, setDropdown] = useState<string>('');

  const handleBoxClick = () => {
    setDropdown('');
  };

  return (
    <Container>
      <BackDrop onClick={handleBoxClick} dropdown={dropdown} />
      {dropdown && <AddTodoComponent setDropdown={setDropdown} />}
      <StyledBox>
        <Button variant="outlined" size="small" onClick={() => setDropdown('true')}>
          AddTodo
        </Button>
        <Button variant="outlined" href="/profile">
          MyProfile
        </Button>
      </StyledBox>
    </Container>
  );
};
