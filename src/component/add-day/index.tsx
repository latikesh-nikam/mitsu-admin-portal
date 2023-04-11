import React from 'react';
import styles from "./addDay.module.scss";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import CustomSelect from '../select';
import { IAddDayProps } from './addDay.types';
import { dayData } from './addDay.data';
import AddActivityForm from '../add-activity';
import { Button } from '@mui/joy';
import { Add } from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const AddDays: React.FC<IAddDayProps> = ({ handleDateChange, selectDate, activityName, duration, handleChangeSelect, handleInputChange, selectedOptions, setActivityName, setDuration, setSelectedOptions, activitiesArr, setActivitiesArr, activityFieldCount, setActivityFieldCount }) => {

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
  };

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
    setActivitiesArr((activitiesArr: any) => [...activitiesArr, { key: `activityName-${activityFieldCount}`, name: activityName, durationMin: duration, dayCount: currentOption.value, activityCount: activityFieldCount}])
  };


  const handleDeleteActivity = (index:number, option: any) => {
    selectedOptions.forEach((moduleOption: any) => {
      moduleOption.id === option.id && moduleOption.activities.splice(index, 1)
    })

    setSelectedOptions([...selectedOptions])
  }

  const handleDeleteScreen = ( activity:any, option:any) => (index:number) => {

    selectedOptions.forEach((moduleOption: any) => {
      moduleOption.id === option.id && moduleOption.activities.forEach((moduleActivity:any)=> {
        moduleActivity.identifier === activity.identifier && moduleActivity.screens.splice(index,1)
      })
    })
    setSelectedOptions([...selectedOptions])

  } 

  return (
    <div className={styles.container}>

      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Select Days-</FormLabel>
          <CustomSelect
            name="select-days"
            hideSelectedOptions={true}
            isMulti={true}
            dropdownOptions={dayData}
            handleChangeSelect={handleDateChange}
            isAutoFocus={false}
            isSearchable={false}
            selectedOptions={selectDate}
            menuPlacement={"bottom"}
          />
        </FormControl>

        {
          selectedOptions?.map((option: any, index: number) => {
            return (
              <div className={styles.dayContainer} key={index}>
                <div className={styles.buttonWrapper}>
                  <FormLabel><h4>DAY {option.id}</h4></FormLabel>
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => handleAddActivity(option)}
                    type="button"
                    className={styles.addBtn}
                  >
                    Add Activities for Day {option?.id}
                  </Button>
                </div>
                {option?.activities?.map((val: any, activityIndex:number) => {
                  return (
                    <>
                      <Button
                        variant="outlined"
                        color="neutral"
                        startDecorator={<Add />}
                        onClick={() => handleDeleteActivity(activityIndex, option)}
                        type="button"
                        className={styles.addBtn}
                      >
                        Delete Activity
                      </Button>

                      <AddActivityForm
                        handleChangeSelect={handleChangeSelect}
                        selectedOptions={selectedOptions}
                        setDuration={setDuration}
                        handleInputChange={handleInputChange}
                        activityName={activityName}
                        setActivityName={setActivityName}
                        duration={duration}
                        screensData={val.screens}
                        handleAddScreen={() => handleAddScreens(option, val)}
                        handleDeleteScreen={handleDeleteScreen(val, option)}
                        activityFieldCount={activityFieldCount}
                        setActivityFieldCount={setActivityFieldCount}
                        dayCount={option.value}
                      />
                    </>
                  )
                })}
              </div>
            )
          })
        }
      </Stack>
    </div>
  )
}

export default AddDays
