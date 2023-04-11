import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import TextInput from '../../../../../component/program-modules/text-input';
import { getFormData } from '../../../../../utils/formData';
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setTextInputFormData: (e: any) => void
}

const ShowModalTextInput: React.FC<Props> = ({ open, setOpen, setTextInputFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    setTextInputFormData(formData);
    toast.success("Submitted Successfully!");
    setHeading("");
    setContent("");
    setOpen(false);
  };

  return (
    <>
      <BasicModalDialog
        children={<TextInput
          handleSubmit={handleSubmit}
          setContent={setContent}
          setHeading={setHeading}
          heading={heading}
          content={content}
          setOpen={setOpen}
        />}
        open={open}
        setOpen={setOpen}
        title="Text Input"
      />
    </>
  )
}

export default ShowModalTextInput