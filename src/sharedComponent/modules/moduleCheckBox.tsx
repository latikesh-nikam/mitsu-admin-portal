import { useState} from 'react';
import Checkbox from '@mui/material/Checkbox';

const ControlledCheckbox = (props: any) => {
  const { moduleDetails, moduleIds, setModuleIds } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, moduleId: string) => {
    if(event.target.checked === true){
        setChecked(event.target.checked);
        setModuleIds(moduleIds.concat([moduleId]))
    } else {
        setChecked(event.target.checked);
        setModuleIds((current: any) => current.filter((moduleCurrId: string) => moduleCurrId !== moduleId))
    }
  };

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => handleChange(event, moduleDetails?.id)}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

export default ControlledCheckbox