import React, { BaseSyntheticEvent } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Textarea } from '@mui/joy';
import { IActivityVideoProps } from './activity-video.types';
import FileUploader from '../../file-uploader';
import styles from "./video.module.scss";
import { useForm } from 'react-hook-form';

const ActivityVideo: React.FC<IActivityVideoProps> = ({ handleSubmit, setContent, setHeading, heading, content, handleVideoUpload, videoName, showProgress, uploaded,
  validateFile, error }) => {
  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      activityVideo: "",
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.optionContainer}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Heading</FormLabel>
          <Input name="heading" value={heading} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea size="lg" variant="soft" name="content" required value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
        </FormControl>

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
          <span className={[styles.error, !errors?.activityVideo && styles.errorVisibility].join(" ")}>{errors?.activityVideo?.message || error || <>&nbsp;</>}</span>
        </FormControl>

        <Button type="submit" disabled={(!heading || !content)}>Submit</Button>
      </Stack>
    </form>
  )
}

export default ActivityVideo