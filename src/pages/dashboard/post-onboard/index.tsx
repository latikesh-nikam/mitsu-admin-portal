import React, { useState } from 'react';
import { ShowModalActivityVideo, ShowModalActivityAudio, ShowModalTextIntro, ShowModalTextInput, ShowModalQuiz, ShowModalCheckboxList, ShowQuizQuesModal } from './showModals';
import ShowModalThinkingTraps from './showModals/showModalThinkingTraps';
import { ShowModalActivitySwipeHelp, ShowModalEmotionIntensity, ShowModalFearLadder } from './showModals';
import ShowModalGroundingExercise from './showModals/showModalGroundingExercise';

interface IPostOnboardScreenProps {
  // OpenModalData: ({ open, setOpen }: any) => JSX.Element
  OpenModalData: any
  open: boolean
  setOpen: (open: boolean) => void
  setTextIntroFormData: (e: any) => void
  setTextInputFormData: (e: any) => void
  setActivityAudioFormData: (e: any) => void
  setActivityVideoFormData: (e: any) => void
  setQuizFormData: (e: any) => void
  setEmotionIntensityFormData: (e: any) => void
  setThinkingTrapFormData: (e: any) => void
  setFearLadderFormData: (e: any) => void
  setSubjectiveQuizFormData: (e: any) => void
  setSwipeTextFormData: (e: any) => void
  postOnboardingQuestions: any
  setGroundExercisingData: (e: any) => void
  quizArr: any
  setQuizArr: (e: any) => void
  audioArr: any
  setAudioArr: (e: any) => void
  videoArr: any
  setVideoArr: (e: any) => void
};

const PostOnboardingScreen: React.FC<IPostOnboardScreenProps> = ({ OpenModalData, open, setOpen, setTextIntroFormData, setTextInputFormData, setActivityAudioFormData, setActivityVideoFormData, setQuizFormData, setEmotionIntensityFormData, setThinkingTrapFormData, setFearLadderFormData, setSubjectiveQuizFormData, setSwipeTextFormData, postOnboardingQuestions, setGroundExercisingData, audioArr, setAudioArr, videoArr, setVideoArr, quizArr, setQuizArr }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      {OpenModalData?.label === "Text Intro" ? <ShowModalTextIntro open={open} setOpen={setOpen} setTextIntroFormData={setTextIntroFormData} /> : <></>}

      {OpenModalData?.label === "Audio" ? <ShowModalActivityAudio open={open} setOpen={setOpen} setActivityAudioFormData={setActivityAudioFormData} type={'modal'} visible={visible} setVisible={setVisible} activity={'other'} audioArr={undefined} setAudioArr={() => {}}/> : <></>}

      {OpenModalData?.label === "Text Block" ? <ShowModalTextInput open={open} setOpen={setOpen} setTextInputFormData={setTextInputFormData} /> : <></>}

      {OpenModalData?.label === "Video" ? <ShowModalActivityVideo open={open} setOpen={setOpen} setActivityVideoFormData={setActivityVideoFormData} type={'modal'} setVisible={setVisible} visible={visible} activity={'other'} videoArr={undefined} setVideoArr={() => {}}/> : <></>}

      {OpenModalData?.label === "Swipe Text" ? <ShowModalActivitySwipeHelp open={open} setOpen={setOpen} setSwipeTextFormData={setSwipeTextFormData} /> : <></>}

      {OpenModalData?.label === "Quiz" ? <ShowQuizQuesModal open={open} setOpen={setOpen} setQuizFormData={setQuizFormData} postOnboardingQuestions={postOnboardingQuestions} activity={"other"} quizArr={undefined} setQuizArr={() => {}}/> : <></>}

      {OpenModalData?.label === "Subjective Quiz" ? <ShowModalCheckboxList open={open} setOpen={setOpen} setSubjectiveQuizFormData={setSubjectiveQuizFormData} /> : <></>}

      {OpenModalData?.label === "Emotion Intensity" ? <ShowModalEmotionIntensity open={open} setOpen={setOpen} setEmotionIntensityFormData={setEmotionIntensityFormData} /> : <></>}

      {OpenModalData?.label === "Thinking Traps" ? <ShowModalThinkingTraps open={open} setOpen={setOpen} setThinkingTrapFormData={setThinkingTrapFormData} /> : <></>}

      {OpenModalData?.label === "Fear Ladder" ? <ShowModalFearLadder open={open} setOpen={setOpen} setFearLadderFormData={setFearLadderFormData} /> : <></>}

      {OpenModalData?.label === "Grounding Exercise" ? <ShowModalGroundingExercise open={open} setOpen={setOpen}  postOnboardingQuestions={postOnboardingQuestions} setGroundExercisingData={setGroundExercisingData} quizArr={quizArr} setQuizArr={setQuizArr} audioArr={setAudioArr} setAudioArr={setAudioArr} videoArr={videoArr} setVideoArr={setVideoArr} /> : <></>}

    </>
  )
};

export default PostOnboardingScreen
