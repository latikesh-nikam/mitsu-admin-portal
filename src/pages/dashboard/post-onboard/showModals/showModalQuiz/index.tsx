import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import Quiz from '../../../../../component/program-modules/quiz';
import { getFormData } from '../../../../../utils/formData';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setQuizFormData: any
}

const ShowModalQuiz: React.FC<Props> = ({ open, setOpen, setQuizFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [questionText, setQuestionText] = useState<any>("");
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [quizOptions, setQuizOptions] = useState<any>({});
  const [options, setOptions] = useState<any>([{ id: 0, label: "Option-1", value: "option1" }]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postData = { ...formData, quizType: quizOptions?.value }
    setQuizFormData(postData);
    toast.success("Submitted Successfully!");
    setHeading("");
    setQuestionText("");
    setSelectedOptions("");
    setOptions([{}])
    setQuizOptions({})
    setOpen(false);
  };

  const handleQuizTypeSelect = (params: any, actionMeta: any) => {
    setQuizOptions(params);
  };

  const handleCorrectAnswerSelect = (params: any) => {
    setSelectedOptions(params);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data = [...options];
    data[index][event.target.name] = event.target.value;
    setOptions(data);
  };

  return (
    <>
      <BasicModalDialog
        children={<Quiz handleSubmit={handleSubmit} setQuestionText={setQuestionText} setHeading={setHeading} heading={heading} questionText={questionText} selectedOptions={selectedOptions} handleCorrectAnswerSelect={handleCorrectAnswerSelect} options={options} setOptions={setOptions} handleInputChange={handleInputChange} setSelectedOptions={setSelectedOptions} setOpen={setOpen} handleQuizTypeSelect={handleQuizTypeSelect} quizOptions={quizOptions}
        />}
        open={open}
        setOpen={setOpen}
        title="Quiz"
      />
    </>
  )
}

export default ShowModalQuiz