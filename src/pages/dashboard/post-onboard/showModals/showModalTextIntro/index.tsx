import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import TextIntro from '../../../../../component/program-modules/text-intro';
import { getFormData } from '../../../../../utils/formData';
interface Props {
  open: any
  setOpen: (open: any) => void
  setTextIntroFormData: any
}

const ShowModalTextIntro: React.FC<Props> = ({ open, setOpen, setTextIntroFormData }) => {
  const [pageHeading, setPageHeading] = useState<any>("");
  const [contentHeading, setContentHeading] = useState<any>("");
  const [contentIntro, setContentIntro] = useState<any>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postFormData = { name: formData.name, content_heading: formData.contentHeading, content_text: contentIntro.description }
    setTextIntroFormData(postFormData);
    toast.success("Submitted Successfully!");
    setPageHeading("");
    setContentHeading("");
    setOpen(false);
  };

  return (
    <>
      <BasicModalDialog
        children={<TextIntro
          handleSubmit={handleSubmit}
          setPageHeading={setPageHeading}
          setContentHeading={setContentHeading}
          pageHeading={pageHeading}
          contentHeading={contentHeading}
          setContentIntro={setContentIntro}
          contentIntro={contentIntro}
          setOpen={setOpen}
        />}
        open={open}
        setOpen={setOpen}
        title="Text Intro"
      />
    </>
  )
}

export default ShowModalTextIntro
