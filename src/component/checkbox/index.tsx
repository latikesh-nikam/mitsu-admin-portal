import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ICheckboxProps } from './checkbox.types';

const CheckboxComp: React.FC<ICheckboxProps> = ({ handleChange, isChecked, label }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox
        checked={isChecked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />}
        label={label} />
    </FormGroup>
  )
}

export default CheckboxComp