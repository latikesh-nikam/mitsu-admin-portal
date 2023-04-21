import React, { BaseSyntheticEvent } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IActivityVideoProps } from './activity-video.types';
import FileUploader from '../../file-uploader';
import styles from "./video.module.scss";
import { useForm } from 'react-hook-form';
import { validateNameField } from '../../../utils/constants/validation';
import QuillActivityInput from '../../activityQuillInput';

const ActivityVideo: React.FC<IActivityVideoProps> = ({ handleSubmit, setContent, setHeading, heading, content, handleVideoUpload, videoName, showProgress, uploaded, validateFile, s3key }) => {

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      activityVideo: "",
      heading: ""
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit} className={styles.optionContainer}>
      <Stack spacing={2}>
        <FormControl className={styles.formControl}>
          <FormLabel className={styles.formLabels}>Heading<span className={styles.requiredField}>*</span></FormLabel>
          <Input value={heading} autoFocus {...register("heading", {
            required: {
              value: true,
              message: "Please enter Heading!"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value),
            maxLength: {
              value: 50,
              message: "Maximum length exceeded"
            },
            validate: validateNameField("Heading")
          })}
          />

          <span className={[styles.error, !errors?.heading && styles.errorVisibility].join(" ")}>{errors?.heading?.message || <>&nbsp;</>}</span>
        </FormControl>

        <Stack spacing={10}>
          <FormControl>
            <FormLabel className={styles.formLabels}>Content<span className={styles.requiredField}>*</span></FormLabel>
            <QuillActivityInput value={content} setValue={setContent} />
          </FormControl>
        </Stack>

        <FormControl className={styles.fileUploadWrapper}>
          <FormLabel className={styles.formLabels}>Video Link<span className={styles.requiredField}>*</span></FormLabel>
          <input
            type="file"
            id="activity-video-file"
            style={{ display: "none" }}
            accept="video/mp4, video/avi"
            onClick={(e: BaseSyntheticEvent) => { e.target.value = null; }}
            {...register('activityVideo', {
              onChange: handleVideoUpload,
              required: {
                value: true,
                message: "Please Upload Image!"
              },
              validate: validateFile
            })}
          />
          <div className={styles.fileUploadSubWrapper}>
            <Input placeholder='Select Video file'
              variant="soft"
              className={styles.uploadInput}
              value={videoName}
            />
            <label htmlFor="activity-video-file" className={styles.uploadButton}>Upload Video</label>
          </div>

          {
            showProgress && <FileUploader uploaded={uploaded} />}
          <span className={[styles.error, !errors?.activityVideo && styles.errorVisibility].join(" ")}>{errors?.activityVideo?.message || <>&nbsp;</>}</span>
        </FormControl>

        <Button type="submit" disabled={!heading || !content || !s3key || !!errors?.activityVideo?.message || !!errors?.heading?.message}>Submit</Button>
      </Stack>
    </form >
  )
}

export default ActivityVideo