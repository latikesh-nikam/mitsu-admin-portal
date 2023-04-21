import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import CheckboxList from '../../../../../component/program-modules/checkbox-list';
import { v4 as uuidv4 } from "uuid";
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setSubjectiveQuizFormData: (e: any) => void
}

const ShowModalCheckboxList: React.FC<Props> = ({ open, setOpen, setSubjectiveQuizFormData }) => {
  const [pageHeading, setPageHeading] = useState("");
  const [content, setContent] = useState<any>("");
  const [options, setOptions] = useState<any>([
    { id: uuidv4(), label: `Option-1`, value: '' }
  ]);
  const [dynamicError, setDynamicError] = useState<{ [key: string]: string }>({
    option0: "Field can not be empty!"
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubjectiveQuizFormData({
      heading: pageHeading,
      contentText: content,
      options: options
    })
    toast.success("Submitted Successfully!");
    setOpen(false);
    setPageHeading("")
    setContent("")
    setOptions([{}])
  };

  const handleDynamicInputValidation = (event: React.ChangeEvent<HTMLInputElement>, index: number, key: string) => {

    let data = [...options];
    if (data[index][key].trim() === '') {
      setDynamicError({ ...dynamicError, [`option${index}`]: "Field can not be empty!" })
    } else {
      delete dynamicError[`option${index}`]; setDynamicError(dynamicError)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data = [...options];
    data[index].value = event.target.value;
    handleDynamicInputValidation(event, index, `value`);
    setOptions(data);
  };

  return (
    <>
      <BasicModalDialog
        children={
          <CheckboxList
            handleSubmit={handleSubmit}
            setPageHeading={setPageHeading}
            setContent={setContent}
            pageHeading={pageHeading}
            content={content}
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
        title="Subjective Quiz"
      />
    </>
  )
}

export default ShowModalCheckboxList