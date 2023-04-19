import React, { useState } from 'react';
import BasicModalDialog from '../../../../../component/modal';
import ActivityVideo from '../../../../../component/program-modules/activity-video';
import { getFormData } from '../../../../../utils/formData';
import axiosInstance from "../../../../../services/service/axiosfileUpload.instance";
import { uploadFilesToS3 } from '../../../../../utils/constants/urls';
import { toast } from "react-hot-toast";

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setActivityVideoFormData: any
  activity: string
  videoArr: any
  setVideoArr: (e: any) => void
}

const ShowModalActivityVideo: React.FC<Props> = ({ open, setOpen, setActivityVideoFormData, activity, videoArr, setVideoArr }) => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState<any>("");
  const [videos, setVideos] = useState("");
  const [uploaded, setUploaded] = useState<any>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [s3Key, setS3Key] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postData = { ...formData, external_link: s3Key, content: content, heading: heading }
    setActivityVideoFormData(postData);
    if (activity === 'GroundingExercise') {
      setVideoArr((videoArr: any) => [...videoArr, { name: "Video", type: "Video", content_heading: heading, content_text: content, external_link: s3Key, isSubType: true }])
    }
    setHeading("");
    setContent("");
    setVideos("");
    setUploaded(null)
    setS3Key("")
    setOpen(false);
  };

  const config = {
    onUploadProgress: (data: any) => {
      setUploaded(Math.round((data.loaded / data.total) * 100));
    }
  }

  const uploadAudioVideoToS3 = async (data: any) => {
    try {
      const res = await axiosInstance.post(uploadFilesToS3, data, config);
      toast.success("File Uploaded!");
      return res
    }
    catch (error) {
      toast.error(`${error}`);
      throw error
    }
  };

  const handleFileChange = async (event: any) => {
    if (validateFile(event.target.files) === true) {
      setShowProgress(true);
      setVideos(event.target.files[0]?.name);

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
    const validTypes = ["video/mp4", "video/avi"];
    if (!validTypes.includes(file[0].type)) {
      return `Only ${validTypes.join(' ')} are allowed!`;
    }
    return true;
  };

  return (
    <BasicModalDialog
      children={
        <>
          <ActivityVideo handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} uploaded={uploaded} showProgress={showProgress} handleVideoUpload={handleFileChange} videoName={videos} validateFile={validateFile} s3key={s3Key} />
        </>
      }
      open={open}
      setOpen={setOpen}
      title="Activity Video"
    />
  )
}

export default ShowModalActivityVideo