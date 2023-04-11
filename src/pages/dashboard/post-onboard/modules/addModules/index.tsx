import React, { useState } from 'react';
import { IAddModuleProps } from './addModule.types';
import Input from '../../../../../component/input';
import styles from "./add.module.scss";
import { FormControl, FormLabel, LinearProgress, Typography } from '@mui/joy';
import AddDays from '../../../../../component/add-day';
import PostOnboardingScreen from '../..';
import FileUploader from '../../../../../component/file-uploader';
import { uploadFilesToS3 } from '../../../../../constants/urls';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../../../service/axiosfileUpload.instance';
import CustomSelect from '../../../../../component/select';
import { weekData } from './addModule.data';
import Stack from '@mui/joy/Stack';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import QuillActivityInput from '../../../../../component/activityQuillInput';
import { addModules } from '../../../../../service/module.service';
import { any } from 'prop-types';


const AddModules: React.FC<IAddModuleProps> = () => {

  const [open, setOpen] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [selectDate, setSelectDate] = useState<any>([]);
  const [selectWeek, setSelectWeek] = useState<any>([]);

  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<any>(null);

  const [modalData, setModalData] = useState<any>();

  const [duration, setDuration] = useState<any>(0);
  const [activityName, setActivityName] = useState<any>("");
  const [moduleHeading, setModuleHeading] = useState<any>("");
  const [moduleDesc, setModuleDesc] = useState<any>("");

  const [textIntroFormData, setTextIntroFormData] = useState({});
  const [textInputFormData, setTextInputFormData] = useState({});
  const [activityAudioFormData, setActivityAudioFormData] = useState({});
  const [activityVideoFormData, setActivityVideoFormData] = useState({});
  const [quizFormData, setQuizFormData] = useState({});

  const [activitiesArr, setActivitiesArr] = useState([]);
  const [screenArr, setScreenArray] = useState<any>([]);
  const [activityFieldCount, setActivityFieldCount] = useState(1);

  const handleDateChange = (e: any) => {
    const data = e.map((option: any, index: number) => {
      if (index === e.length - 1) {
        return { ...option, activities: [{ identifier: 0, activityName: '', duration: 0, screens: [] }] }
      } else return option
    })
    setSelectDate(data);
    setSelectedOptions(data);
    setActivityFieldCount(1)
  };

  const handleWeekChange = (params: any) => {
    setSelectWeek(params);
  }

  const handleSelectChange = (e: any, actionMeta: any, activityCount: number, dayCount: number, ) => {
    let data = [...selectedOptions];
    setSelectedOptions(data);
    setScreenArray((screenArr: any) => [...screenArr, { dayCount: dayCount, activityCount: activityCount, type: e.value, name: "Mood Log"}])
    const modalComponent = e
    if (modalComponent) {
      actionMeta.action === "remove-value" ? setOpen(false) : setOpen(true)
      setModalData(modalComponent)
    }
  };

  const handleInputChange = () => {
  };

  const handleForm = () => {

  };

  const config = {
    onUploadProgress: (data: any) => {
      setUploaded(Math.round((data.loaded / data.total) * 100));
    }
  };

  const uploadAudioVideoToS3 = async (data: any) => {
    try {
      const res = await axiosInstance.post(uploadFilesToS3, data, config);
      toast.success("File Uploaded!");
      return res
    }
    catch (error) {
      toast.error(`${error}`);
      throw error
    }
  };

  const handleFileChange = async (event: any) => {
    setShowProgress(true);
    const formData = new FormData()
    formData.append("file", event.target.files[0]);
    const uploadData = await uploadAudioVideoToS3(formData);
    setShowProgress(false);
    return uploadData
  };

  const getScreenAsperActivitiesAndDay= (item: any) => {
    let scrn = screenArr.map((singleScreen: any, index: number) => {
      if((item.dayCount === singleScreen.dayCount) && (item.activityCount === singleScreen.activityCount)){
        return {
          name: singleScreen?.name,
          type: singleScreen?.type
        }
      }
    })

    scrn = scrn.filter(function(element: any) {
      return element !== undefined
    })

    return scrn;
  }

  const removeDuplicate = (val: any) => {
    let newArray = [];
    let uniqueObject: any = {};
    for (let i in val) {
      let objTitle = val[i]['name'];
      uniqueObject[objTitle] = val[i];
    }
    for (const i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }
    return newArray;
  }

  const getActivitiesListAsPerDay = (day: number, activitiesList: any) => {
    let val = activitiesList.map((item: any, index: number) => {
      if(item.dayCount === day){
        return {
          name: item.name,
          durationMin: Number(item.durationMin),
          screens: getScreenAsperActivitiesAndDay(item)
        }
      }
    })

    val = val.filter(function( element: any ) {
      return element !== undefined;
   });

   let updatedActivities = removeDuplicate(val)

    return updatedActivities
    
  }

  const submitModule = async () => {
    let subModules = selectDate?.map((dte: any, index: number) => {
      return {
        day: dte.value,
        activities: getActivitiesListAsPerDay(dte.value, activitiesArr)
      }
    })
    let moduleDetails = {
      name: moduleHeading,
      description: moduleDesc,
      week: selectWeek?.value,
      image_link: "https://img.freepik.com/premium-vector/hand-drawn-girl-with-anxiety-touch-head-surrounded-by-think-mental-disorder-chaos-consciousness-finding-answers-confusion-concept_36380-1419.jpg?w=2000",
      sub_modules: subModules
    }
    const res = await addModules(moduleDetails);
    if(res){
      toast.success("Module Added Successfully")
    } else {
      toast.error("Something Went Wrong!!")
    }
  }

  const hookForm = useForm({
    defaultValues: {
      name: '',
      description: "",
      activities: [{ activityHeading: "", duration: 0, screens: [] }]
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    // resolver: yupResolver(ProjectValidation)
  });

  const {
    setValue,
    control,
    setError,
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors }
  } = hookForm;

  const { append, remove } = useFieldArray({
    name: "activities",
    control: control
  })

  const changeModuleHeading = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("name", `${event.currentTarget.value}`)
  }

  return (
    <div className={styles.personelForm}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Enter Module Details</h1>
        <form onSubmit={handleForm}>
        <Button onClick={() => submitModule()} variant="contained" style={{margin: '0.5rem'}}>Add Module</Button>

          <div className={styles.formElements}>
            <div className={styles.inputContainer}>
              <div className={styles.specificElements}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Module Heading<span className={styles.requiredField}>*</span></FormLabel>
                    <QuillActivityInput value={moduleHeading} setValue={setModuleHeading}/>
                    {/* <Input name="moduleHeading" required value={moduleHeading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModuleHeading(e.target.value)} /> */}
                  </FormControl>
                  <br/><br/>
                  <FormControl>
                    <FormLabel>Module Description<span className={styles.requiredField}>*</span></FormLabel>
                    <QuillActivityInput value={moduleDesc} setValue={setModuleDesc}/>
                    {/* <Input name="moduleHeading" required value={moduleDesc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModuleDesc(e.target.value)} /> */}
                  </FormControl>
                  <br/><br/>
                  <FormControl>
                    <FormLabel>Week<span className={styles.requiredField}>*</span></FormLabel>
                    <CustomSelect
                      name="select-weeks"
                      hideSelectedOptions={true}
                      isMulti={false}
                      dropdownOptions={weekData}
                      handleChangeSelect={handleWeekChange}
                      isAutoFocus={false}
                      isSearchable={false}
                      selectedOptions={selectWeek}
                      menuPlacement={"bottom"}
                    />
                  </FormControl>

                  <FormControl>
                    <FileUploader
                      name="file"
                      accept=".jpeg, .jpg,"
                      handleOnChange={handleFileChange}
                      isRequired={true} label="Upload Module Image"
                    />
                    {showProgress &&
                      <LinearProgress
                        determinate
                        variant="soft"
                        color="primary"
                        size="lg"
                        thickness={32}
                        value={uploaded}
                        sx={{
                          '--LinearProgress-radius': '0px',
                          '--LinearProgress-progressThickness': '24px',
                          boxShadow: 'sm',
                          borderColor: 'neutral.500',
                        }}
                      >
                        <Typography
                          level="body3"
                          fontWeight="xl"
                          textColor="common.white"
                          sx={{ mixBlendMode: 'difference' }}
                        >
                          Uploading {`${uploaded}%...`}
                        </Typography>
                      </LinearProgress>
                    }
                  </FormControl>
                </Stack>
              </div>
            </div>
          </div>
          <AddDays
            handleChangeSelect={handleSelectChange}
            selectedOptions={selectedOptions}
            selectDate={selectDate}
            handleDateChange={handleDateChange}
            setDuration={setDuration}
            duration={duration}
            handleInputChange={handleInputChange}
            activityName={activityName}
            setActivityName={setActivityName}
            selectWeek={selectWeek}
            setSelectedOptions={setSelectedOptions}
            activitiesArr={activitiesArr}
            setActivitiesArr={setActivitiesArr}
            activityFieldCount={activityFieldCount}
            setActivityFieldCount={setActivityFieldCount}
          />
          <PostOnboardingScreen
            OpenModalData={modalData}
            open={open}
            setOpen={setOpen}
            setTextIntroFormData={setTextIntroFormData}
            setTextInputFormData={setTextInputFormData}
            setActivityAudioFormData={setActivityAudioFormData}
            setActivityVideoFormData={setActivityVideoFormData}
            setQuizFormData={setQuizFormData}
          />
        </form>
      </div>
    </div>
  )

}

export default AddModules
