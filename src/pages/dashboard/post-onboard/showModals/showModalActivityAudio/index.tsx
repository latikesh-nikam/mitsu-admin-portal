import React, { useState } from 'react';
import BasicModalDialog from '../../../../../component/modal';
import ActivityAudio from '../../../../../component/program-modules/activity-audio';
import { getFormData } from '../../../../../utils/formData';
import axiosInstance from "../../../../../services/service/axiosfileUpload.instance";
import { uploadFilesToS3 } from "../../../../../utils/constants/urls";
import { toast } from "react-hot-toast";
import Canvas from '../../../../../component/canvas';
import styles from "./audio.module.scss";

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setActivityAudioFormData: any
  type: 'canvas' | 'modal'
  setVisible: (visible: boolean) => void
  visible: boolean
  activity: string
  audioArr: any
  setAudioArr: (e: any) => void
}

const ShowModalActivityAudio: React.FC<Props> = ({ open, setOpen, setActivityAudioFormData, type, setVisible, visible, activity, audioArr, setAudioArr }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [audios, setAudios] = useState<any>([]);
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
    setActivityAudioFormData(formData);
    if(activity === 'GroundingExercise'){
      setAudioArr((audioArr: any) => [...audioArr, {name: "Audio", type: "Audio", content_heading: heading, content_text: content, external_link: s3Key, isSubType: true}])
    }
    setHeading("");
    setContent("");
    setOpen(false);
  };

  const handleAutoCompleteChange = (params: any) => {
    setAutocompleteOptions(params);
  }

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
    <div className={styles.container}>
      {type === "modal" &&
        <BasicModalDialog
          children={
            <ActivityAudio handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} handleFileChange={handleFileChange} uploaded={uploaded} showProgress={showProgress} setOpen={setOpen} handleAutoCompleteChange={handleAutoCompleteChange} autocompleteOptions={autocompleteOptions} />}
          open={open}
          setOpen={setOpen}
          title="Activity Audio"
        />
      }
      {type === "canvas" &&
        <div className={styles.canvas}>
          <Canvas
            setVisible={setVisible}
            visible={visible}
            children={<ActivityAudio handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} handleFileChange={handleFileChange} uploaded={uploaded} showProgress={showProgress} setOpen={setOpen} handleAutoCompleteChange={handleAutoCompleteChange} autocompleteOptions={autocompleteOptions} />}
          />
        </div>
      }
    </div>
  )
}

export default ShowModalActivityAudio