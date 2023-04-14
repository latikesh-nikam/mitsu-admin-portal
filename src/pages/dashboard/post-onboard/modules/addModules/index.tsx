import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { IAddModuleProps } from './addModule.types';
import styles from "./add.module.scss";
import { Button, FormControl, FormLabel, Input } from '@mui/joy';
import AddDays from '../../../../../component/add-day';
import PostOnboardingScreen from '../..';
import FileUploader from '../../../../../component/file-uploader';
import { uploadFilesToS3 } from '../../../../../utils/constants/urls';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../../../services/service/axiosfileUpload.instance';
import CustomSelect from '../../../../../component/select';
import { weekData } from './addModule.data';
import Stack from '@mui/joy/Stack';
import { addModules } from '../../../../../services/service/module.service';
import { Add } from '@mui/icons-material';
import { getFileName } from './utils';
import { useFieldArray, useForm } from 'react-hook-form';
import QuillActivityInput from '../../../../../component/activityQuillInput';
import { getPostOnBoardingQuestions } from '../../../../../services/service/user.service';
import { ShowModalActivityAudio } from '../../showModals';
import { any } from 'prop-types';

const AddModules: React.FC<IAddModuleProps> = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>("");

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
  const [textInputFormData, setTextInputFormData] = useState<any>({});
  const [activityAudioFormData, setActivityAudioFormData] = useState<any>({});
  const [activityVideoFormData, setActivityVideoFormData] = useState<any>({});
  const [quizFormData, setQuizFormData] = useState<any>({});
  const [emtionIntensity, setEmotionIntensityFormData] = useState<any>({});
  const [thinkingTrapsData, setThinkingTrapFormData] = useState<any>({});
  const [fearLadderData, setFearLadderFormData] = useState<any>({});
  const [subjectiveQuizData, setSubjectiveQuizFormData] = useState<any>({});
  const [swipeTextData, setSwipeTextFormData] = useState<any>({});
  const [groundExercisingData, setGroundExercisingData] = useState<any>({});

  const [activitiesArr, setActivitiesArr] = useState([]);
  const [screenArr, setScreenArray] = useState<any>([]);
  const [activityFieldCount, setActivityFieldCount] = useState(1);
  const [imageS3Key, setImageS3Key] = useState<string>("");
  const [postOnboardingQuestions, setPostOnboardingQuestions] = useState([])
  const [quizArr, setQuizArr] = useState<any>([])
  const [audioArr, setAudioArr] = useState<any>([])
  const [videoArr, setVideoArr] = useState<any>([])

  const postOnBoardingQuestions = async () => {
    let res = await getPostOnBoardingQuestions()
    setPostOnboardingQuestions(res?.data?.data)
  }

  useEffect(() => {
    postOnBoardingQuestions()
  }, [])

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

  const handleSelectChange = (e: any, actionMeta: any, activityCount: number, dayCount: number,) => {
    let data = [...selectedOptions];
    setSelectedOptions(data);
    setScreenArray((screenArr: any) => [...screenArr, { dayCount: dayCount, activityCount: activityCount, type: e.value, name: 'Mood_Log' }])
    const modalComponent = e
    if (modalComponent) {
      actionMeta.action === "remove-value" ? setOpen(false) : setOpen(true)
      setModalData(modalComponent)
    }
  };

  const handleInputChange = () => {
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
    if (uploadData.status === 201) {
      setImageS3Key(uploadData?.data?.data?.key)
    }
    else {
      toast.error(`${uploadData.statusText}`);
    }
  };

  const resetDetails = () => {
    setSelectDate([])
    setSelectedOptions([])
    setSelectWeek([])
    setModalData([])
    setDuration(0)
    setActivityName("")
    setModuleHeading("")
    setModuleDesc("")
    setTextIntroFormData({})
    setTextInputFormData({})
    setActivityAudioFormData({})
    setActivityVideoFormData({})
    setQuizFormData({})
    setEmotionIntensityFormData({})
    setThinkingTrapFormData({})
    setFearLadderFormData({})
    setSubjectiveQuizFormData({})
    setSwipeTextFormData({})
    setActivitiesArr([])
    setScreenArray([])
    setActivityFieldCount(1)
  }

  const handleSelections = (options: any) => {
    let selectionOption = options?.map((item: any) => {
      return {
        selection: Object.values(item)[0],
        description: Object.values(item)[1]
      }
    })
    return selectionOption;
  }

  const handleSubjectiveQuizSelections = (options: any) => {
    let selectionOption = options?.map((item: any) => {
      return {
        selection: Object.values(item)[0]
      }
    })
    return selectionOption;
  }

  const handleGroundingExerciseSelection = (options: any) => {
    let selectionOption = options?.map((item: any, index: number) => {
      return {
        index: index + 1,
        title: Object.values(item)[0],
        description: Object.values(item)[1]
      }
    })
    return selectionOption;
  }

  const getScreenDataAsPerType = (singleScreen: any) => {
    if (singleScreen?.type === 'Mood_Log') {
      return {
        name: 'Mood Log',
        type: singleScreen?.type
      }
    } else if (singleScreen?.type === 'Text_Block') {
      return {
        name: 'Text Block',
        type: singleScreen?.type,
        content_heading: textInputFormData.name,
        content_text: textInputFormData.description
      }
    } else if (singleScreen?.type === 'Audio') {
      return {
        name: "Audio",
        type: singleScreen?.type,
        content_heading: activityAudioFormData?.heading,
        content_text: activityAudioFormData?.content,
        external_link: activityAudioFormData.key
      }
    } else if (singleScreen?.type === 'Video') {
      return {
        name: "Video",
        type: singleScreen?.type,
        content_heading: activityVideoFormData?.heading,
        content_text: activityVideoFormData?.content,
        external_link: activityVideoFormData.key
      }
    } else if (singleScreen?.type === 'Emotion_Intensity') {
      return {
        name: 'Emotion Intensity',
        type: singleScreen?.type,
        content_heading: emtionIntensity?.pageHeading,
        content_text: emtionIntensity?.content
      }
    } else if (singleScreen?.type === 'Thinking_Traps') {
      return {
        name: 'Thinking Traps',
        type: singleScreen?.type,
        content_heading: thinkingTrapsData?.heading,
        content_text: thinkingTrapsData?.questionText,
        selections: handleSelections(thinkingTrapsData?.options)
      }
    } else if (singleScreen?.type === 'Fear_Ladder') {
      return {
        name: "Fear Ladder",
        type: singleScreen?.type,
        content_heading: fearLadderData?.name,
        completionTime: Number(fearLadderData?.completionTime),
        content_text: fearLadderData?.content_text
      }
    } else if (singleScreen?.type === 'Subjective_Quiz') {
      return {
        name: "Subjective Quiz",
        type: singleScreen?.type,
        heading: subjectiveQuizData?.heading,
        content_text: subjectiveQuizData?.contentText,
        selections: handleSubjectiveQuizSelections(subjectiveQuizData?.options)
      }
    } else if (singleScreen?.type === 'Swipe_Text') {
      return {
        name: 'Swipe Text',
        type: singleScreen?.type,
        heading: swipeTextData?.heading,
        selections: handleSelections(swipeTextData?.options)
      }
    } else if (singleScreen?.type === "Quiz") {
      return {
        name: 'Quiz',
        type: singleScreen?.type,
        content_heading: quizFormData?.contentHeading,
        question_ids: quizFormData?.questionIds
      }
    } else if(singleScreen?.type === "Grounding_Exercise"){
      let val = [
        {
          name: 'Grounding Exercise',
          type: singleScreen?.type,
          heading: "Ground Yourself",
          content_heading: groundExercisingData?.content_heading,
          content_text: groundExercisingData?.content_text,
          options: handleGroundingExerciseSelection(groundExercisingData?.options)
        },
        ...quizArr,
        ...audioArr,
        ...videoArr
      ]
      return val
    } else {
      return {
        name: singleScreen?.name,
        type: singleScreen?.type
      }
    }
  }

  const getScreenAsperActivitiesAndDay = (item: any) => {
    let scrn = screenArr.reduce((acc:any,singleScreen: any, index: number) => {
      if ((item.dayCount === singleScreen.dayCount) && (item.activityCount === singleScreen.activityCount)) {
        if(singleScreen?.type === "Grounding_Exercise"){
          return [...acc,...getScreenDataAsPerType(singleScreen) as any]
        }
          return [...acc,getScreenDataAsPerType(singleScreen)]
      }
      return [...acc]
    },[])
    // console.log(scrn)

    // scrn = scrn.filter(function (element: any) {
    //   return element !== undefined
    // })

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
      if (item.dayCount === day) {
        return {
          name: item.name,
          durationMin: Number(item.durationMin),
          screens: getScreenAsperActivitiesAndDay(item)
        }
      }
    })

    val = val.filter(function (element: any) {
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
      image_link: imageS3Key,
      sub_modules: subModules
    }
    const res = await addModules(moduleDetails);
    if (res) {
      toast.success("Module Added Successfully")
      resetDetails()
    } else {
      toast.error("Something Went Wrong!!")
    }
  };

  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues: {
  //     activityImage: "",
  //   },
  //   mode: 'onChange',
  //   reValidateMode: 'onChange',
  // });

  // const onSubmit = (data: any) => {
  //   const test = getFileName(
  //     typeof getValues('activityImage') === 'string'
  //       ? (getValues('activityImage') as string)
  //       : "");
  //   console.log(test);
  //   console.log(data);
  // };

  const handleImageUpload = (e: BaseSyntheticEvent) => {
    setImageName(e.target.files[0]?.name)
    handleFileChange(e);
  }

  const handleSubmit = () => {

  }

  return (
    <div className={styles.moduleForm}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Enter Module Details</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formElements}>
            <div className={styles.inputContainer}>
              <div className={styles.specificElements}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel className={styles.formLabels}>Module Name<span className={styles.requiredField}>*</span></FormLabel>
                    <Input value={moduleHeading} onChange={(e:any) => setModuleHeading(e.target.value)} autoFocus />
                  </FormControl >
                  <br /><br />
                  <FormControl>
                    <FormLabel className={styles.formLabels}>Module Description<span className={styles.requiredField}>*</span></FormLabel>
                    <QuillActivityInput value={moduleDesc} setValue={setModuleDesc} />
                  </FormControl >
                  <br /><br />
                  <FormControl>
                    <FormLabel className={styles.formLabels}>Week<span className={styles.requiredField}>*</span></FormLabel>
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

                </Stack>

                {/* <FormControl className={styles.fileUploadWrapper}>
                  <FormLabel className={styles.formLabels}>Image Link</FormLabel>
                  <input
                    type="file"
                    id="activity-image-file"
                    style={{ display: "none" }}
                    accept=".jpg, .jpeg"
                    onClick={(e: BaseSyntheticEvent) => { e.target.value = null; }}
                    {...register('activityImage', {
                      onChange: handleImageUpload
                    })}
                  />
                  <div className={styles.fileUploadSubWrapper}>
                    <Input placeholder='Select Image file'
                      variant="soft"
                      className={styles.uploadInput}
                      value={imageName}
                    />
                    <label htmlFor="activity-image-file" className={styles.uploadButton}>Upload Image</label>
                  </div>
                  {showProgress && <FileUploader uploaded={uploaded} />}
                </FormControl> */}

              </div >
            </div >
          </div >
          <Stack spacing={2}>
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
              setEmotionIntensityFormData={setEmotionIntensityFormData}
              setThinkingTrapFormData={setThinkingTrapFormData}
              setFearLadderFormData={setFearLadderFormData}
              setSubjectiveQuizFormData={setSubjectiveQuizFormData}
              setSwipeTextFormData={setSwipeTextFormData}
              postOnboardingQuestions={postOnboardingQuestions}
              setGroundExercisingData={setGroundExercisingData}
              quizArr={quizArr}
              setQuizArr={setQuizArr}
              audioArr={audioArr}
              setAudioArr={setAudioArr}
              videoArr={videoArr}
              setVideoArr={setVideoArr}
            />
            <Button
              onClick={() => submitModule()}
              startDecorator={<Add />}
            >Submit Module
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  )
}

export default AddModules
