import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import ThinkingTraps from '../../../../../component/program-modules/thinking-traps';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setThinkingTrapFormData: (e: any) => void
}

const ShowModalThinkingTraps: React.FC<Props> = ({ open, setOpen, setThinkingTrapFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [questionText, setQuestionText] = useState<any>("");
  const [options, setOptions] = useState<any>([{}]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setThinkingTrapFormData({
      heading: heading,
      questionText: questionText,
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

  return (
    <>
      <BasicModalDialog
        children={
          <ThinkingTraps
            handleSubmit={handleSubmit}
            setQuestionText={setQuestionText}
            setHeading={setHeading}
            heading={heading}
            questionText={questionText}
            options={options}
            setOptions={setOptions}
            handleInputChange={handleInputChange}
            setOpen={setOpen}
          />
        }
        open={open}
        setOpen={setOpen}
        title="Thinking Traps"
      />
    </>
  )
}

export default ShowModalThinkingTraps