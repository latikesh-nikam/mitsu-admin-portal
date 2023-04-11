import React, { useState } from 'react';
import BasicModalDialog from '../../../../../component/modal';
import ActivityVideo from '../../../../../component/program-modules/activity-video';
import { getFormData } from '../../../../../utils/formData';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import axiosInstance from "../../../../../service/axiosfileUpload.instance";
import { uploadFilesToS3 } from '../../../../../constants/urls';
import { toast } from "react-hot-toast";

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setActivityVideoFormData: any
}

const ShowModalActivityVideo: React.FC<Props> = ({ open, setOpen, setActivityVideoFormData }) => {
  const [heading, setHeading] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [videos, setVideos] = useState<any>([]);
  const [uploaded, setUploaded] = useState<any>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [s3Key, setS3Key] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const postData = { ...formData, key: s3Key }
    setActivityVideoFormData(postData);
    setHeading("");
    setContent("");
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
      <BasicModalDialog
        children={
          <>
            <ActivityVideo handleSubmit={handleSubmit} setContent={setContent} setHeading={setHeading} heading={heading} content={content} handleFileChange={handleFileChange} setOpen={setOpen} />
            {showProgress &&
              <LinearProgress
                determinate
                variant="soft"
                color="primary"
                size="lg"
                thickness={32}
                value={uploaded}
                sx={{
                  '--LinearProgress-radius': '0px',
                  '--LinearProgress-progressThickness': '24px',
                  boxShadow: 'sm',
                  borderColor: 'neutral.500',
                }}
              >
                <Typography
                  level="body3"
                  fontWeight="xl"
                  textColor="common.black"
                  sx={{ mixBlendMode: 'difference' }}
                >
                  Uploading {`${uploaded}%...`}
                </Typography>
              </LinearProgress>
            }
          </>
        }
        open={open}
        setOpen={setOpen}
        title="Activity Video"
      />
    </>
  )
}

export default ShowModalActivityVideo