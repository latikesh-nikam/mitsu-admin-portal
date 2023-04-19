import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import styles from "./add-screen.module.scss";
import { IAddScreenProps } from './add-screen.types';
import CustomSelect from '../select';
import { screensDropdown } from './add-screen.data';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ISelectOptionsProps } from '../../interface';
import { ActionMeta, MultiValue, SingleValue } from 'react-select';

const AddScreens: React.FC<IAddScreenProps> = ({ activityFieldCount, dayCount, handleChangeSelect, duration, setDuration, setOpen, handleInputChange, activityName, setActivityName, handleDeleteScreen, index }) => {

  return (
    <div className={styles.screenContainer}>
      <Stack spacing={2}>
        <div className={styles.screens}>
          <FormLabel className={styles.screenLabel}>Screen-{index + 1}</FormLabel>
          <div className={styles.screenSubWrapper}>
            <span
              className={styles.deleteBtn}>
              <div onClick={handleDeleteScreen} className={styles.btn}>
                <DeleteRoundedIcon />
              </div>
            </span>
            <FormControl>
              <FormLabel className={styles.formLabels}>Select Screen</FormLabel>
              <CustomSelect
                name="program-activities"
                isMulti={false}
                dropdownOptions={screensDropdown}
                handleChangeSelect={(newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>, activityFieldCount: number, dayCount: number) => handleChangeSelect(newValue, actionMeta, activityFieldCount, dayCount)}
                isAutoFocus={false}
                isSearchable={false}
                menuPlacement="bottom"
                activityFieldCount={activityFieldCount}
                dayCount={dayCount}
                hideSelectedOptions={false}
              />
            </FormControl>
          </div>
        </div>
      </Stack>
    </div>
  )
}

export default AddScreens