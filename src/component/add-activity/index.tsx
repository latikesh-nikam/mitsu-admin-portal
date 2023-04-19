import React, { useState } from 'react';
import styles from "./add-activity.module.scss";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import { IAddActivityProps } from './add-activity.types';
import AddScreens from '../add-screens';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/joy';
import Input from '../input';

const AddActivityForm: React.FC<IAddActivityProps> = ({ dayCount, handleChangeSelect, duration, setDuration, handleInputChange, activityName, setActivityName, screensData, handleAddScreen, handleDeleteScreen, activityFieldCount, errorDuration, errorName, setErrorDuration, setErrorName }) => {

  const [open, setOpen] = useState<boolean>(false);

  const handleNumberValidation = (value: string) => {
    if (Number(value) <= 0) {
      setErrorDuration("Duration can not be less than or equal to zero")
    }
    else if (Number(value) > 5) {
      setErrorDuration("Duration can not be bigger than 5")
    }
    else if (!new RegExp(/^[0-9\b]+$/).test(value)) {
      setErrorDuration("Duration can only be integer")
    }
    else { setErrorDuration("") }
  };

  const handleNameValidation = (value: string) => {
    if (value.trim() === "") {
      setErrorName("Field can not be empty!");
    }
    else {
      setErrorName("")
    }
  };

  return (
    <div className={styles.container}>
      <Stack spacing={2}>

        <FormControl>
          <FormLabel className={styles.formLabels}>Activity Name<span className={styles.requiredField}>*</span></FormLabel>
          <Input name={`activityName-${activityFieldCount}`} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setActivityName(e.target.value);
            handleNameValidation(e.target.value);
          }
          } />
          <span className={[styles.error, !errorName && styles.errorVisibility].join(" ")}>{errorName || <>&nbsp;</>}</span>
        </FormControl>

        <FormControl>
          <FormLabel className={styles.formLabels}>Duration<span className={styles.requiredField}>*</span></FormLabel>
          <Input name={`activityDuration-${activityFieldCount}`} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDuration(Number(e.target.value))
            handleNumberValidation(e.target.value)
          }
          } placeholder="Enter duration in min" type="number" onKeyDown={(e) =>
            ["ArrowUp", "ArrowDown", "e", "E"].includes(e.key) && e.preventDefault()
          } step={1} />
          <span className={[styles.error, !errorDuration && styles.errorVisibility].join(" ")}>{errorDuration || <>&nbsp;</>}</span>
        </FormControl>

        <FormControl className={styles.subContainer}>
          <div className={styles.deleteContainer}>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<Add />}
              onClick={handleAddScreen}
              type="button"
              className={styles.addBtn}
            >
              Add Screens
            </Button>
          </div>
          {
            screensData?.map((val: Record<string, string>, index: number) => {
              return (
                <div key={index}>
                  <AddScreens
                    handleChangeSelect={handleChangeSelect}
                    setDuration={setDuration}
                    duration={duration}
                    setOpen={setOpen}
                    handleInputChange={handleInputChange}
                    activityName={activityName}
                    setActivityName={setActivityName}
                    handleDeleteScreen={() => handleDeleteScreen(index)}
                    index={index}
                    activityFieldCount={activityFieldCount}
                    dayCount={dayCount}
                  />
                </div>
              )
            })}
        </FormControl>
      </Stack>
    </div >
  )
}

export default AddActivityForm
