import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { IRadioProps } from './radio.types';

const RadioButton: React.FC<IRadioProps> = ({ label, handleChange }) => {
  return (
    <FormControl>
      <FormControlLabel value="female" control={
        <Radio
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={label}
          onChange={handleChange}
        />} label={label} />
    </FormControl >
  );
};

export default RadioButton