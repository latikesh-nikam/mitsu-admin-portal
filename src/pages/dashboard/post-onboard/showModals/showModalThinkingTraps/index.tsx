import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import { v4 as uuidv4 } from 'uuid';
import ThinkingTraps from '../../../../../component/program-modules/thinking-traps';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setThinkingTrapFormData: (e: any) => void
}

const ShowModalThinkingTraps: React.FC<Props> = ({ open, setOpen, setThinkingTrapFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [questionText, setQuestionText] = useState<any>("");
  const [dynamicError, setDynamicError] = useState<{ [key: string]: string }>({
    name0: "Field can not be empty!"
  });

  const [options, setOptions] = useState<any>([{
    id: uuidv4(), label: "Selection-1", name: "", desc: ""
  }]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setThinkingTrapFormData({
      heading: heading,
      questionText: questionText,
      options: options
    })
    toast.success("Submitted Successfully!");
    setOpen(false);
    setHeading("")
    setQuestionText("")
    setOptions([{}])
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data = [...options];
    if ((!!event.target) && (event.target.name === "name")) {
      data[index].name = event.target.value;
    }
    else {
      data[index].desc = event
    }
    setOptions(data);
  };

  const handleDynamicInputValidation = (event: React.ChangeEvent<HTMLInputElement>, index: number, key: string) => {

    let data = [...options];
    if (data[index][key].trim() === '') {
      setDynamicError({ ...dynamicError, [`${event.target.name}${index}`]: "Field can not be empty!" })
    } else { delete dynamicError[`${event.target.name}${index}`]; setDynamicError(dynamicError) }
  }

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
            handleDynamicValidation={handleDynamicInputValidation}
            dynamicError={dynamicError}
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