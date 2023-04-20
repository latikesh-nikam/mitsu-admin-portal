import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import { getFormData } from '../../../../../utils/formData';
import FearLadder from '../../../../../component/program-modules/fear-ladder';
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setFearLadderFormData: (e: any) => void
}

const ShowModalFearLadder: React.FC<Props> = ({ open, setOpen, setFearLadderFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [completionTime, setCompletionTime] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postFormData = { name: heading, content_text: content, completionTime: completionTime }
    setFearLadderFormData(postFormData);
    toast.success("Submitted Successfully!");
    setHeading("");
    setContent("");
    setCompletionTime("");
    setOpen(false);
  };

  return (
    <>
      <BasicModalDialog
        children={<FearLadder
          handleSubmit={handleSubmit}
          setContent={setContent}
          setHeading={setHeading}
          heading={heading}
          content={content}
          completionTime={completionTime}
          setOpen={setOpen}
          setCompletionTime={setCompletionTime}
        />}
        open={open}
        setOpen={setOpen}
        title="Fear Ladder"
      />
    </>
  )
}

export default ShowModalFearLadder