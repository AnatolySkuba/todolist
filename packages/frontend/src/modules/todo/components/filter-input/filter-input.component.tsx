import React, { useState } from 'react';
import { FormControl, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { PADDINGS } from '../../../theme';

export const FilterInputComponent = ({
  setSearch,
  setPage
}: {
  setSearch: Function;
  setPage: Function;
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    setSearch(event.target.value);
    setPage(1);
  };

  const handleClick = (): void => {
    setValue('');
    setSearch('');
    setPage(1);
  };

  return (
    <FormControl>
      <TextField
        size="small"
        variant="outlined"
        onChange={handleChange}
        value={value}
        placeholder="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: value ? 'flex' : 'none' }}
              onClick={handleClick}
            >
              <ClearIcon />
            </InputAdornment>
          ),
          style: {
            height: 30,
            width: 160,
            padding: PADDINGS.styledTextField
          }
        }}
      />
    </FormControl>
  );
};
