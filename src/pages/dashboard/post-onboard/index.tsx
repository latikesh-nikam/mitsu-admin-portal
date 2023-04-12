import React, { useState } from 'react';
import { ShowModalActivitySwipeHelp, ShowModalActivityVideo, ShowModalActivityAudio, ShowModalTextIntro, ShowModalTextInput, ShowModalQuiz, ShowModalCheckboxList, ShowModalEmotionIntensity, ShowModalFearLadder, ShowQuizQuesModal } from './showModals';
import ShowModalThinkingTraps from './showModals/showModalThinkingTraps';


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
  setThinkingTrapFormData: (e:any) => void
  setFearLadderFormData: (e: any) => void
  setSubjectiveQuizFormData: (e: any) => void
  setSwipeTextFormData: (e:any) => void
  postOnboardingQuestions: any
};

const PostOnboardingScreen: React.FC<IPostOnboardScreenProps> = ({ OpenModalData, open, setOpen, setTextIntroFormData, setTextInputFormData, setActivityAudioFormData, setActivityVideoFormData, setQuizFormData, setEmotionIntensityFormData, setThinkingTrapFormData, setFearLadderFormData, setSubjectiveQuizFormData, setSwipeTextFormData, postOnboardingQuestions }) => {
  return (
    <>
      {OpenModalData?.label === "Text Intro" ? <ShowModalTextIntro open={open} setOpen={setOpen} setTextIntroFormData={setTextIntroFormData} /> : <></>}

      {OpenModalData?.label === "Audio" ? <ShowModalActivityAudio open={open} setOpen={setOpen} setActivityAudioFormData={setActivityAudioFormData} /> : <></>}

      {OpenModalData?.label === "Text Block" ? <ShowModalTextInput open={open} setOpen={setOpen} setTextInputFormData={setTextInputFormData} /> : <></>}

      {OpenModalData?.label === "Video" ? <ShowModalActivityVideo open={open} setOpen={setOpen} setActivityVideoFormData={setActivityVideoFormData} /> : <></>}

      {OpenModalData?.label === "Swipe Text" ? <ShowModalActivitySwipeHelp open={open} setOpen={setOpen} setSwipeTextFormData={setSwipeTextFormData}/> : <></>}

      {OpenModalData?.label === "Quiz" ? <ShowQuizQuesModal open={open} setOpen={setOpen} setQuizFormData={setQuizFormData} postOnboardingQuestions={postOnboardingQuestions}/> : <></>}
      {OpenModalData?.label === "Subjective Quiz" ? <ShowModalCheckboxList open={open} setOpen={setOpen} setSubjectiveQuizFormData={setSubjectiveQuizFormData} /> : <></>}
      {OpenModalData?.label === "Emotion Intensity" ? <ShowModalEmotionIntensity open={open} setOpen={setOpen} setEmotionIntensityFormData={setEmotionIntensityFormData} /> : <></>}

      {OpenModalData?.label === "Thinking Traps" ? <ShowModalThinkingTraps open={open} setOpen={setOpen} setThinkingTrapFormData={setThinkingTrapFormData}/> : <></>}
      {OpenModalData?.label === "Fear Ladder" ? <ShowModalFearLadder open={open} setOpen={setOpen} setFearLadderFormData={setFearLadderFormData}/> : <></>}

    </>
  )
};

export default PostOnboardingScreen
