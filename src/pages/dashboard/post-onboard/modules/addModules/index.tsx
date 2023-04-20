import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { IAddModuleProps } from './addModule.types';
import styles from "./add.module.scss";
import { Button, FormControl, FormLabel, Input } from '@mui/joy';
import AddDays from '../../../../../component/add-day';
import PostOnboardingScreen from '../..';
import { uploadFilesToS3 } from '../../../../../utils/constants/urls';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../../../services/service/axiosfileUpload.instance';
import CustomSelect from '../../../../../component/select';
import { weekData } from './addModule.data';
import Stack from '@mui/joy/Stack';
import { addModules } from '../../../../../services/service/module.service';
import { Add } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import QuillActivityInput from '../../../../../component/activityQuillInput';
import { getPostOnBoardingQuestions } from '../../../../../services/service/user.service';
import { validateNameField } from "../../../../../utils/constants/validation";
import FileUploader from '../../../../../component/file-uploader';
import { useNavigate } from 'react-router-dom';

const AddModules: React.FC<IAddModuleProps> = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [imageName, setImageName] = useState("");

  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [selectDate, setSelectDate] = useState<any>([]);
  const [selectWeek, setSelectWeek] = useState<any>([]);

  const [showProgress, setShowProgress] = useState(false);
  const [uploaded, setUploaded] = useState<any>(null);

  const [modalData, setModalData] = useState<any>();

  const [duration, setDuration] = useState<any>("");
  const [activityName, setActivityName] = useState("");
  const [moduleHeading, setModuleHeading] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

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
  const [imageS3Key, setImageS3Key] = useState("");
  const [postOnboardingQuestions, setPostOnboardingQuestions] = useState([])
  const [quizArr, setQuizArr] = useState<any>([])
  const [audioArr, setAudioArr] = useState<any>([])
  const [videoArr, setVideoArr] = useState<any>([]);
  const [modulesData, setModulesData] = useState<any>([]);
  const [errorDuration, setErrorDuration] = useState<string>("Field can not be empty!");
  const [errorName, setErrorName] = useState<string>("Field can not be empty!");
  const [completionArr, setCompletionArr] = useState<any>([])

  const postOnBoardingQuestions = async () => {
    let res = await getPostOnBoardingQuestions()
    setPostOnboardingQuestions(res?.data?.data)
  }

  useEffect(() => {
    postOnBoardingQuestions()
  }, [])

  const handleDateChange = (e: any, actionMeta: any) => {
    setSelectDate(e);
    setSelectedOptions(e);
    setActivityFieldCount(1)
    setCompletionArr((completionArr: any) => [...completionArr, { activityCount: 1, isPrimary: false, dayCount: e[e.length-1].value}])
  };

  const handleWeekChange = (params: any) => {
    setSelectWeek(params);
  }

  const handleSelectChange = (e: any, actionMeta: any, activityCount: number, dayCount: number, screenIndex: number) => {
    let data = [...selectedOptions];
    setSelectedOptions(data);
    const newScreenArray=[...screenArr]
    const oldIndex = newScreenArray.findIndex((obj)=>{
      const {dayCount:d,activityCount:a,screenIndex:s}=obj
      return dayCount===d && activityCount==a && screenIndex==s;
    })
    if(oldIndex!==-1){
      newScreenArray[oldIndex]={ dayCount: dayCount, activityCount: activityCount, type: e.value, name: 'Mood_Log', screenIndex: screenIndex };
    }else{
      newScreenArray.push({ dayCount: dayCount, activityCount: activityCount, type: e.value, name: 'Mood_Log', screenIndex: screenIndex });
    }
    setScreenArray( [...newScreenArray])
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
    setDuration("")
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
    setImageName("")
  }

  const handleSelections = (options: any) => {
    let selectionOption = options?.map((item: any) => {
      return {
        selection: item.name,
        description: item.desc
      }
    })
    return selectionOption;
  }

  const handleSubjectiveQuizSelections = (options: any) => {
    let selectionOption = options?.map((item: any) => {
      return {
        selection: item.value
      }
    })
    return selectionOption;
  }

  const handleGroundingExerciseSelection = (options: any) => {
    let selectionOption = options?.map((item: any, index: number) => {
      return {
        index: index + 1,
        title: item.name,
        description: item.desc
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
        external_link: activityAudioFormData.external_link
      }
    } else if (singleScreen?.type === 'Video') {
      return {
        name: "Video",
        type: singleScreen?.type,
        content_heading: activityVideoFormData?.heading,
        content_text: activityVideoFormData?.content,
        external_link: activityVideoFormData.external_link
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
    }

    else if (singleScreen?.type === "Self_Check_In") {
      return {
        name: 'Self_Check_In',
        type: singleScreen?.type,
      }
    }

    else if (singleScreen?.type === "Quiz") {
      return {
        name: 'Quiz',
        type: singleScreen?.type,
        content_heading: quizFormData?.contentHeading,
        questionIds: quizFormData?.questionIds
      }
    } else if (singleScreen?.type === "Grounding_Exercise") {
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
  };

  const getScreenAsperActivitiesAndDay = (item: any) => {
    let scrn = screenArr.reduce((acc: any, singleScreen: any, index: number) => {
      if ((item.dayCount === singleScreen.dayCount) && (item.activityCount === singleScreen.activityCount)) {
        if (singleScreen?.type === "Grounding_Exercise") {
          return [...acc, ...getScreenDataAsPerType(singleScreen) as any]
        }
        return [...acc, getScreenDataAsPerType(singleScreen)]
      }
      return [...acc]
    }, [])

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
        const [{isPrimary} ] =completionArr.filter((element:any)=>{return element.dayCount===item.dayCount && element.activityCount===item.activityCount})
        return {
          name: item.name,
          durationMin: Number(item.durationMin),
          isPrimary: isPrimary,
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
    setModulesData(moduleDetails);

    const res = await addModules(moduleDetails);
    if (res) {
      toast.success("Module Added Successfully")
      resetDetails();
      nav("/dashboard/modules/all");
    } else {
      toast.error("Something Went Wrong!!")
    }
  };

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      activityImage: "",
      moduleheading: ""
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const handleImageUpload = (e: BaseSyntheticEvent) => {
    if (validateFile(e.target.files) === true) {
      setImageName(e.target.files[0]?.name)
      handleFileChange(e);
    }
  };

  const handleSubmit = () => { }

  const isScreenData = () => {
    selectedOptions.map((val: Record<string, string>) => val.activities).map((val: any) => val.screens)
  }

  const validateFile = (file: any) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/jfif", "image/pjpeg", "image/pjp", "image/svg", "image/webp"];
    if (!validTypes.includes(file[0].type)) {
      return `Only ${validTypes.join(' ')} files are allowed!`;
    }
    return true;
  };

  return (
    <div className={styles.moduleForm}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Enter Module Details</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formElements}>
            <div className={styles.inputContainer}>
              <div className={styles.specificElements}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel className={styles.formLabels}>Module Name<span className={styles.requiredField}>*</span></FormLabel>

                    <Input value={moduleHeading} autoFocus {...register("moduleheading", {
                      required: {
                        value: true,
                        message: "Please enter Module Name!"
                      },
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setModuleHeading(e.target.value),
                      maxLength: {
                        value: 50,
                        message: "Maximum length exceeded"
                      },
                      validate: validateNameField("Module Name")
                    })}
                    />

                    <span className={[styles.error, !errors?.moduleheading && styles.errorVisibility].join(" ")}>{errors?.moduleheading?.message || <>&nbsp;</>}</span>

                  </FormControl>

                  <FormControl>
                    <FormLabel className={styles.formLabels}>Module Description<span className={styles.requiredField}>*</span></FormLabel>
                    <QuillActivityInput value={moduleDesc} setValue={setModuleDesc} />
                  </FormControl >

                  <br /><br />
                  {/* <FormControl>
                    <FormLabel className={styles.formLabels}>Week<span className={styles.requiredField}>*</span></FormLabel>
                    <CustomSelect
                      name="select-weeks"
                      isMulti={false}
                      dropdownOptions={weekData}
                      handleChangeSelect={handleWeekChange}
                      isAutoFocus={false}
                      isSearchable={false}
                      selectedOptions={selectWeek}
                      menuPlacement={"bottom"}
                    />
                  </FormControl> */}
                </Stack>

                <FormControl className={styles.fileUploadWrapper}>
                  <FormLabel className={styles.formLabels}>Image Link<span className={styles.requiredField}>*</span></FormLabel>
                  <input
                    type="file"
                    id="activity-image-file"
                    style={{ display: "none" }}
                    accept=".jpg, .jpeg, .png, .gif, .jfif, .pjpeg, .pjp, .svg, .webp"
                    onClick={(e: BaseSyntheticEvent) => { e.target.value = null; }}
                    {...register('activityImage', {
                      onChange: handleImageUpload,
                      required: {
                        value: true,
                        message: "Please Upload Image!"
                      },
                      validate: (e: any) => validateFile(e)
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
                  <span className={[styles.error, !errors?.activityImage && styles.errorVisibility].join(" ")}>{errors?.activityImage?.message || <>&nbsp;</>}</span>
                </FormControl>

              </div>
            </div>
          </div>
          <Stack spacing={2}>
            <div className={styles.addDays}>
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
                errorName={errorName}
                setErrorName={setErrorName}
                errorDuration={errorDuration}
                setErrorDuration={setErrorDuration}
                completionArr={completionArr}
                setCompletionArr={setCompletionArr}
              />
            </div>
            <Button
              disabled={(selectedOptions.length === 0) || !moduleHeading || !moduleDesc || !!errorName || !!errorDuration}
              onClick={() => submitModule()}
              startDecorator={<Add />}
            >Submit Module
            </Button>
          </Stack>
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
        </form>
      </div>
    </div>
  )
}

export default AddModules
