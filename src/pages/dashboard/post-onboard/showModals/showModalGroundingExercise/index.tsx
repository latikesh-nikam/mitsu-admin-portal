import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import { getFormData } from '../../../../../utils/formData';
import GroundingExercise from '../../../../../component/program-modules/grounding-exercise';
import ShowModalActivityAudio from '../showModalActivityAudio';
import ShowModalActivityVideo from '../showModalActivityVideo';
import ShowModalQuiz from '../showModalQuiz';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const ShowModalGroundingExercise: React.FC<Props> = ({ open, setOpen }) => {
  const [heading, setHeading] = useState<any>("");
  const [questionText, setQuestionText] = useState<any>("");
  const [options, setOptions] = useState<any>([{}]);
  const [subScreenData, setSubScreenData] = useState<any>([]);

  const [activityAudioFormData, setActivityAudioFormData] = useState([]);
  const [activityVideoFormData, setActivityVideoFormData] = useState([]);
  const [quizFormData, setQuizFormData] = useState([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    toast.success("Submitted Successfully!");
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data = [...options];
    data[index][event.target.name] = event.target.value;
    setOptions(data);
  };

  const handleSubScreenSelect = (e: any) => {
    console.log(e);
    setSubScreenData(e);
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
      {subScreenData.label === "Audio" ? <ShowModalActivityAudio open={open} setOpen={setOpen} setActivityAudioFormData={setActivityAudioFormData} /> : <></>}
      {subScreenData.label === "Video" ? <ShowModalActivityVideo open={open} setOpen={setOpen} setActivityVideoFormData={setActivityVideoFormData} /> : <></>}
      {/* {subScreenData.label === "Subjective Quiz" ? <ShowModal open={open} setOpen={setOpen} /> : <></>} */}
      {subScreenData.label === "Quiz" ? <ShowModalQuiz open={open} setOpen={setOpen} setQuizFormData={setQuizFormData} /> : <></>}
    </>
  )
}

export default ShowModalGroundingExercise