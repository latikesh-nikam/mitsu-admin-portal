import React, { useState } from 'react';
import styles from "./addDay.module.scss";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import CustomSelect from '../select';
import { IAddDayProps } from './addDay.types';
import { dayData } from './addDay.data';
import AddActivityForm from '../add-activity';
import { Button } from '@mui/joy';
import { Add, Delete } from '@mui/icons-material';
import { IActivityProps, IOptionProps } from '../../interface';

const AddDays: React.FC<IAddDayProps> = ({ handleDateChange, selectDate, activityName, duration, handleChangeSelect, handleInputChange, selectedOptions, setActivityName, setDuration, setSelectedOptions, activitiesArr, setActivitiesArr, activityFieldCount, setActivityFieldCount, errorDuration, errorName, setErrorDuration, setErrorName, completionArr, setCompletionArr }) => {

  const handleAddActivity = (option: any) => {
    const obj = { activityName: '', duration: 0, screens: [] }
    const values = selectedOptions.map((e: any) => {
      if (e.id === option.id) {
        e.activities.push({ ...obj, identifier: e?.activities.length })
      }
      return e
    })
    setSelectedOptions(values);
    setActivityFieldCount(activityFieldCount + 1)
    setCompletionArr((completionArr: any) => [...completionArr, { activityCount: activityFieldCount + 1, isPrimary: false, dayCount: option.value}])
  };

  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (activityCount: number, dayCount: number) => {
    const newCompletionArr=completionArr.map((element:any) => {
      if (element.activityCount===activityCount && element.dayCount===dayCount){
        element.isPrimary=!element.isPrimary
      }
      return element;
    });
    setCompletionArr([...newCompletionArr])
  }

  const handleAddScreens = (currentOption: any, val: any) => {
    const obj = { name: '' }
    const data = selectedOptions.map((e: any) => {
      if (e.id === currentOption.id) {
        e.activities.map((activity: any) => {
          if (activity.identifier === val.identifier) {
            activity.screens.push(obj)
          }
          return activity
        })

      }
      return e
    })
    setSelectedOptions(data)
    setActivitiesArr((activitiesArr: any) => [...activitiesArr, { key: `activityName-${activityFieldCount}`, name: activityName, durationMin: duration, dayCount: currentOption.value, activityCount: activityFieldCount }])
  };

  const handleDeleteActivity = (index: number, option: any) => {
    selectedOptions?.forEach((moduleOption: any) => {
      moduleOption.id === option.id && moduleOption.activities.splice(index, 1)
    })

    setSelectedOptions([...selectedOptions])
  }

  const handleDeleteScreen = (activity: any, option: any) => (index: number) => {

    selectedOptions?.forEach((moduleOption: any) => {
      moduleOption.id === option.id && moduleOption.activities.forEach((moduleActivity: any) => {
        moduleActivity.identifier === activity.identifier && moduleActivity.screens.splice(index, 1)
      })
    })
    setSelectedOptions([...selectedOptions])
  }

  return (
    <div className={styles.container}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel className={styles.formLabels}>Select Days<span className={styles.requiredField}>*</span></FormLabel>
          <CustomSelect
            name="select-days"
            isMulti={true}
            dropdownOptions={dayData}
            handleChangeSelect={(newValue, actionMeta) => handleDateChange(newValue, actionMeta)}
            isAutoFocus={false}
            isSearchable={false}
            selectedOptions={selectDate}
            menuPlacement={"bottom"}
          />

        </FormControl>

        {
          selectedOptions?.map((option: IOptionProps, index: number) => {
            return (
              <div className={styles.dayContainer} key={index}>
                <FormLabel className={styles.dayNumber}>DAY-{option.id}</FormLabel>
                <div className={styles.addActivityBtn}>
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => handleAddActivity(option)}
                    type="button"
                    className={styles.addBtn}
                  >
                    Add Activities
                  </Button >
                </div >
                {
                  option?.activities?.map((val: IActivityProps, activityIndex: number) => {
                    return (
                      <div className={styles.activityWrapper} key={activityIndex}>
                        <div className={styles.delActivityBtn}>
                          <Button
                            variant="solid"
                            color="danger"
                            startDecorator={<Delete />}
                            onClick={() => handleDeleteActivity(activityIndex, option)}
                            type="button"
                            className={styles.addBtn}
                          >
                            Delete Activity
                          </Button>
                        </div>
                        <AddActivityForm
                          handleChangeSelect={handleChangeSelect}
                          selectedOptions={selectedOptions}
                          setDuration={setDuration}
                          handleInputChange={handleInputChange}
                          activityName={activityName}
                          setActivityName={setActivityName}
                          duration={duration}
                          screensData={val?.screens}
                          handleAddScreen={() => handleAddScreens(option, val)}
                          handleDeleteScreen={handleDeleteScreen(val, option)}
                          activityFieldCount={activityFieldCount}
                          setActivityFieldCount={setActivityFieldCount}
                          dayCount={Number(option.value)}
                          errorName={errorName}
                          setErrorName={setErrorName}
                          errorDuration={errorDuration}
                          setErrorDuration={setErrorDuration}
                          handleChange={handleChange}
                          checked={checked}
                          activityIndex={activityIndex}
                        />
                      </div>
                    )
                  })}
              </div >
            )
          })
        }
      </Stack >
    </div >
  )
}

export default AddDays
