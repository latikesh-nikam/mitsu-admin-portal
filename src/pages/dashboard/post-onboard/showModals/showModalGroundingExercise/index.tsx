import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import { getFormData } from '../../../../../utils/formData';
import GroundingExercise from '../../../../../component/program-modules/grounding-exercise';
import ShowModalActivityAudio from '../showModalActivityAudio';
import ShowModalActivityVideo from '../showModalActivityVideo';
import ShowQuizQuesModal from '../showQuizQuesModal';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  postOnboardingQuestions: any
  setGroundExercisingData: (e: any) => void
  quizArr: any
  setQuizArr: (e: any) => void
  audioArr: any
  setAudioArr: (e: any) => void
  videoArr: any
  setVideoArr: (e: any) => void
}

const ShowModalGroundingExercise: React.FC<Props> = ({ open, setOpen, postOnboardingQuestions, setGroundExercisingData, audioArr, setAudioArr, videoArr, setVideoArr, quizArr, setQuizArr }) => {
  const [heading, setHeading] = useState<any>("");
  const [questionText, setQuestionText] = useState<any>("");
  const [options, setOptions] = useState<any>([{}]);
  const [subScreenData, setSubScreenData] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const [audioData, setAudioData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [quizOpen, setQuizOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [audioOpen, setAudioOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    setGroundExercisingData({
      content_heading: heading,
      content_text: questionText,
      options: options
    })
    toast.success("Submitted Successfully!");
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data = [...options];
    data[index][event.target.name] = event.target.value;
    setOptions(data);
  };

  const handleSubScreenSelect = (e: any) => {
    setSubScreenData(e);
    if (e.label === 'Quiz') {
      setQuizOpen(true)
    }
    if (e.label === 'Audio') {
      setAudioOpen(true)
    }
    if (e.label === 'Video') {
      setVideoOpen(true)
    }
  };

  return (
    <>
      <BasicModalDialog
        children={
          <GroundingExercise
            handleSubmit={handleSubmit}
            setQuestionText={setQuestionText}
            setHeading={setHeading}
            heading={heading}
            questionText={questionText}
            options={options}
            setOptions={setOptions}
            handleInputChange={handleInputChange}
            setOpen={setOpen}
            handleChangeSelect={handleSubScreenSelect} />
        }
        open={open}
        setOpen={setOpen}
        title="Grounding Exercise"
      />

      {subScreenData.label === "Quiz" ? <ShowQuizQuesModal open={quizOpen} setOpen={setQuizOpen} setQuizFormData={setQuizData} postOnboardingQuestions={postOnboardingQuestions} activity={'GroundingExercise'} quizArr={quizArr} setQuizArr={setQuizArr} /> : <></>}
      {subScreenData.label === "Audio" ? <ShowModalActivityAudio open={audioOpen} setOpen={setAudioOpen} setActivityAudioFormData={setAudioData} activity={'GroundingExercise'} audioArr={audioArr} setAudioArr={setAudioArr} /> : <></>}
      {subScreenData.label === "Video" ? <ShowModalActivityVideo open={videoOpen} setOpen={setVideoOpen} setActivityVideoFormData={setVideoData} activity={'GroundingExercise'} videoArr={videoArr} setVideoArr={setVideoArr} /> : <></>}
    </>
  )
}

export default ShowModalGroundingExercise
