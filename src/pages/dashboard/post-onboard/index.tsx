import React, { useState } from 'react';
import { ShowModalActivitySwipeHelp, ShowModalActivityVideo, ShowModalActivityAudio, ShowModalTextIntro, ShowModalTextInput, ShowModalQuiz } from './showModals';

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
};

const PostOnboardingScreen: React.FC<IPostOnboardScreenProps> = ({ OpenModalData, open, setOpen, setTextIntroFormData, setTextInputFormData, setActivityAudioFormData, setActivityVideoFormData, setQuizFormData }) => {

  return (
    <>
      {OpenModalData?.label === "Text Intro" ? <ShowModalTextIntro open={open} setOpen={setOpen} setTextIntroFormData={setTextIntroFormData} /> : <></>}

      {OpenModalData?.label === "Activity Audio" ? <ShowModalActivityAudio open={open} setOpen={setOpen} setActivityAudioFormData={setActivityAudioFormData} /> : <></>}

      {OpenModalData?.label === "Text Input" ? <ShowModalTextInput open={open} setOpen={setOpen} setTextInputFormData={setTextInputFormData} /> : <></>}

      {OpenModalData?.label === "Activity Video" ? <ShowModalActivityVideo open={open} setOpen={setOpen} setActivityVideoFormData={setActivityVideoFormData} /> : <></>}

      {/* {OpenModalData?.label === "Swipe Help" ? <ShowModalActivitySwipeHelp open={open} setOpen={setOpen} /> : <></>} */}

      {OpenModalData?.label === "Quiz" ? <ShowModalQuiz open={open} setOpen={setOpen} setQuizFormData={setQuizFormData} /> : <></>}

    </>
  )
};

export default PostOnboardingScreen
