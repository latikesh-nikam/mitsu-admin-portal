import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import { getFormData } from '../../../../../utils/formData';
import EmotionIntensity from '../../../../../component/program-modules/emotion-intensity';
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setEmotionIntensityFormData: (e: any) => void
}

const ShowModalEmotionIntensity: React.FC<Props> = ({ open, setOpen, setEmotionIntensityFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postFormData = { pageHeading: heading, content: content }
    setEmotionIntensityFormData(postFormData);
    toast.success("Emotion Intensity details submitted successfully")
    setOpen(false)
  };

  return (
    <>
      <BasicModalDialog
        children={<EmotionIntensity
          handleSubmit={handleSubmit}
          setContent={setContent}
          setHeading={setHeading}
          heading={heading}
          content={content}
          setOpen={setOpen}
        />}
        open={open}
        setOpen={setOpen}
        title="Emotion Intensity"
      />
    </>
  )
}

export default ShowModalEmotionIntensity;