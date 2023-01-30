import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { APP_KEYS } from '../../../common/consts';

export const FilterButtonsComponent = ({
  setStatus,
  setPage
}: {
  setStatus: Function;
  setPage: Function;
}) => {
  const [alignment, setAlignment] = useState(APP_KEYS.SWITCHER_KEYS.ALL);
  const switchers = Object.values(APP_KEYS.SWITCHER_KEYS);

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = (status: string) => {
    setStatus(status !== `${APP_KEYS.SWITCHER_KEYS.ALL}` ? status : '');
    setPage(1);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {switchers.map((switcher, index) => (
        <ToggleButton
          key={index}
          onClick={() => handleSubmit(switcher)}
          size="small"
          value={switcher}
        >
          {switcher === `${APP_KEYS.SWITCHER_KEYS.IS_COMPLETE}`
            ? `${switcher.slice(2)}D`
            : switcher.slice(2)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
