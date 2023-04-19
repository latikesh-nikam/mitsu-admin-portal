import React, { useState } from 'react';
import BasicModalDialog from '../../../../../component/modal';
import ActivityAudio from '../../../../../component/program-modules/activity-audio';
import { getFormData } from '../../../../../utils/formData';
import axiosInstance from "../../../../../services/service/axiosfileUpload.instance";
import { uploadFilesToS3 } from "../../../../../utils/constants/urls";
import { toast } from "react-hot-toast";
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setActivityAudioFormData: any
  activity: string
  audioArr: any
  setAudioArr: (e: any) => void
}

const ShowModalActivityAudio: React.FC<Props> = ({ open, setOpen, setActivityAudioFormData, activity, audioArr, setAudioArr }) => {

  const [heading, setHeading] = useState("");
  const [content, setContent] = useState<any>("");
  const [audios, setAudios] = useState("");
  const [uploaded, setUploaded] = useState<any>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [s3Key, setS3Key] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postFormData = { ...formData, external_link: s3Key, heading: heading, content: content }
    setActivityAudioFormData(postFormData);
    if (activity === 'GroundingExercise') {
      setAudioArr((audioArr: any) => [...audioArr, { name: "Audio", type: "Audio", content_heading: heading, content_text: content, external_link: s3Key, isSubType: true }])
    }

    setHeading("");
    setContent("");
    setAudios("");
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
    if (validateFile(event.target.files) === true) {
      setShowProgress(true);
      setAudios(event.target.files[0]?.name);

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
    }
  };

  const validateFile = (file: any) => {
    const validTypes = ["audio/mp3", "audio/mpeg"];
    if (!validTypes.includes(file[0].type)) {
      return `Only ${validTypes.join(' ')} are allowed!`;
    }
    return true;
  };

  return (
    <BasicModalDialog
      children={
        <ActivityAudio handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} uploaded={uploaded} showProgress={showProgress} handleAudioUpload={handleFileChange} audioName={audios} validateFile={validateFile} s3key={s3Key} />}
      open={open}
      setOpen={setOpen}
      title="Activity Audio"
    />
  )
}

export default ShowModalActivityAudio