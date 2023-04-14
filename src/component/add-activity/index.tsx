import React, { useState } from 'react';
import styles from "./add-activity.module.scss";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import { IAddActivityProps } from './add-activity.types';
import AddScreens from '../add-screens';
import { Add } from '@mui/icons-material';
import { Button, Input } from '@mui/joy';

const AddActivityForm: React.FC<IAddActivityProps> = ({ dayCount, handleChangeSelect, selectedOptions, duration, setDuration, handleInputChange, activityName, setActivityName, screensData, handleAddScreen, handleDeleteScreen, activityFieldCount, setActivityFieldCount }) => {

  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.container}>

      <Stack spacing={2}>
        <FormControl>
          <FormLabel className={styles.formLabels}>Activity Name<span className={styles.requiredField}>*</span></FormLabel>
          <Input name={`activityName-${activityFieldCount}`} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setActivityName(e.target.value)

          }} />
        </FormControl>

        <FormControl>
          <FormLabel className={styles.formLabels}>Duration<span className={styles.requiredField}>*</span></FormLabel>
          <Input name={`activityDuration-${activityFieldCount}`} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(Number(e.target.value))} placeholder="Enter duration in min" type="number" />
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
