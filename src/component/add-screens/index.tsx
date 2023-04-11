import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import styles from "./add-screen.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IAddScreenProps } from './add-screen.types';
import CustomSelect from '../select';
import { screensDropdown } from './add-screen.data';

const AddScreens: React.FC<IAddScreenProps> = ({ activityFieldCount, dayCount, handleChangeSelect, duration, setDuration, setOpen, handleInputChange, activityName, setActivityName, handleDeleteScreen }) => {

  // const handleAddOption = () => {
  //   const values = [...screens];
  //   values.push({});
  //   setScreens(values);
  // };

  // const handleRemoveItems = (index: number) => {
  //   const values = [...screens];
  //   values.splice(index, 1);
  //   setScreens(values);
  // };

  return (
    <div className={styles.screenContainer}>
      <Stack spacing={2}>
        <div className={styles.screens}>
          <div className={styles.deleteContainer}>

            <FormLabel>Screen</FormLabel>

            {/* <div onClick={handleDeleteScreen} className={styles.deleteBtn}>
              <DeleteRoundedIcon /></div> */}
          </div>

          <FormControl>
            <FormLabel>Select Screen</FormLabel>
            <CustomSelect
              name="program-activities"
              isMulti={false}
              dropdownOptions={screensDropdown}

              handleChangeSelect={(e: any, actionMeta: any,  activityFieldCount: number, dayCount: number) => handleChangeSelect(e, actionMeta, activityFieldCount, dayCount)}
              isAutoFocus={false}
              isSearchable={false}
              // selectedOptions={}
              menuPlacement="bottom"
              hideSelectedOptions={true}
              activityFieldCount={activityFieldCount}
              dayCount={dayCount}
            />
          </FormControl>
        </div>
        <Button type="submit" hidden disabled={!duration} onClick={e => setOpen(false)}>Submit</Button>
      </Stack>
    </div >
  )
}

export default AddScreens