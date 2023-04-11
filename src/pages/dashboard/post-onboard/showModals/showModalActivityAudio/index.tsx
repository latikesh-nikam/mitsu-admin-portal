import React, { useState } from 'react';
import BasicModalDialog from '../../../../../component/modal';
import ActivityAudio from '../../../../../component/program-modules/activity-audio';
import { getFormData } from '../../../../../utils/formData';
import axiosInstance from "../../../../../service/axiosfileUpload.instance";
import { uploadFilesToS3 } from "../../../../../constants/urls";
import { toast } from "react-hot-toast";

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setActivityAudioFormData: any
}

const ShowModalActivityAudio: React.FC<Props> = ({ open, setOpen, setActivityAudioFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [audios, setAudios] = useState<any>([]);
  const [uploaded, setUploaded] = useState<any>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [s3Key, setS3Key] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postData = { ...formData, key: s3Key }
    setActivityAudioFormData(postData);
    setHeading("");
    setContent("");
    setOpen(false);
  };

  const config = {
    onUploadProgress: (data: any) => {
      setUploaded(Math.round((data.loaded / data.total) * 100));
    }
  };

  const uploadAudioVideoToS3 = async (data: any) => {
    try {
      const res = await axiosInstance.post(uploadFilesToS3, data, config);
      toast.success("File Uploaded!");
      return res
    }
    catch (error) {
      toast.error(`${error}`)
      throw error
    }
  };

  const handleFileChange = async (event: any) => {
    setShowProgress(true);
    setAudios(event.target.files[0]);

    const formData = new FormData()
    formData.append("file", event.target.files[0]);

    const uploadData = await uploadAudioVideoToS3(formData);
    if (uploadData.data.statusCode === 201) {
      setS3Key(uploadData?.data.data.key);
    }
    else {
      toast.error(`${uploadData.statusText}`);
    }
    setShowProgress(false);
  };

  return (
    <>
      <BasicModalDialog
        children={
          <ActivityAudio handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} handleFileChange={handleFileChange} uploaded={uploaded} showProgress={showProgress} setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
        title="Activity Audio"
      />
    </>
  )
}

export default ShowModalActivityAudio