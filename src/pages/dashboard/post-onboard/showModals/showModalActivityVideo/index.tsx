import React, { useState } from 'react';
import BasicModalDialog from '../../../../../component/modal';
import ActivityVideo from '../../../../../component/program-modules/activity-video';
import { getFormData } from '../../../../../utils/formData';
import axiosInstance from "../../../../../services/service/axiosfileUpload.instance";
import { uploadFilesToS3 } from '../../../../../utils/constants/urls';
import { toast } from "react-hot-toast";
import Canvas from '../../../../../component/canvas';
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setActivityVideoFormData: any
  type: 'canvas' | 'modal'
  setVisible: (visible: boolean) => void
  visible: boolean
  activity: string
  videoArr: any
  setVideoArr: (e: any) => void
}

const ShowModalActivityVideo: React.FC<Props> = ({ open, setOpen, setActivityVideoFormData, type, setVisible, visible, activity, videoArr, setVideoArr }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [videos, setVideos] = useState<any>([]);
  const [uploaded, setUploaded] = useState<any>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [s3Key, setS3Key] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<{ id: number, label: string, value: string }>({
    id: 0,
    label: "",
    value: ""
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postData = { ...formData, key: s3Key, content: content.description }
    setActivityVideoFormData(postData);
    if(activity === 'GroundingExercise'){
      setVideoArr((videoArr: any) => [...videoArr, {name: "Video", type: "Video", content_heading: heading, content_text: content, external_link: s3Key, isSubType: true}])
    }
    setHeading("");
    setContent("");
    setOpen(false);
  };

  const handleAutoCompleteChange = (params: any) => {
    setAutocompleteOptions(params);
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
    setShowProgress(true);
    setVideos(event.target.files[0]);

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
      {type === "modal" &&
        <BasicModalDialog
          children={
            <>
              <ActivityVideo handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} handleFileChange={handleFileChange} setOpen={setOpen} handleAutoCompleteChange={handleAutoCompleteChange} autocompleteOptions={autocompleteOptions} uploaded={uploaded} showProgress={showProgress} />
            </>
          }
          open={open}
          setOpen={setOpen}
          title="Activity Video"
        />
      }
      {
        type === "canvas" &&
        <Canvas
          setVisible={setVisible}
          visible={visible}
          children={
            <ActivityVideo handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} handleFileChange={handleFileChange} setOpen={setOpen} handleAutoCompleteChange={handleAutoCompleteChange} autocompleteOptions={autocompleteOptions} uploaded={uploaded} showProgress={showProgress} />
          }
        />
      }
    </>
  )
}

export default ShowModalActivityVideo