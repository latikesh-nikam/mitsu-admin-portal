import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import SwipeHelp from '../../../../../component/program-modules/swipe-help';
import { getFormData } from '../../../../../utils/formData';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const ShowModalCheckboxList: React.FC<Props> = ({ open, setOpen }) => {
  const [pageHeading, setPageHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [options, setOptions] = useState<any>([{}]);

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

  return (
    <>
      <BasicModalDialog
        children={
          <SwipeHelp
            handleSubmit={handleSubmit}
            setPageHeading={setPageHeading}
            setContent={setContent}
            pageHeading={pageHeading}
            content={content}
            options={options}
            setOptions={setOptions}
            handleInputChange={handleInputChange}
            setOpen={setOpen}
          />
        }
        open={open}
        setOpen={setOpen}
        title="Swipe Help"
      />
    </>
  )
}

export default ShowModalCheckboxList