import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import SwipeHelp from '../../../../../component/program-modules/swipe-help';
import { v4 as uuidv4 } from "uuid";

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setSwipeTextFormData: (e: any) => void
}

const ShowModalCheckboxList: React.FC<Props> = ({ open, setOpen, setSwipeTextFormData }) => {
  const [pageHeading, setPageHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [options, setOptions] = useState<any>([{
    id: uuidv4(), label: "Carousel-1", name: "", desc: ""
  }]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSwipeTextFormData({
      heading: pageHeading,
      options: options
    })
    toast.success("Submitted Successfully!");
    setOpen(false);
    setPageHeading("")
    setContent("")
    setOptions([{}])
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
    let data = [...options];
    if ((!!event.target) && (event.target.name === "name")) {
      data[index].name = event.target.value;
    }
    else {
      data[index].desc = event
    }
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