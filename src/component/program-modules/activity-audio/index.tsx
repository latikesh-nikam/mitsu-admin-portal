import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IActivityAudioProps } from './activity-audio.types';
import FileUploader from '../../file-uploader';
import styles from "./audio.module.scss";
import { useForm } from 'react-hook-form';
import QuillActivityInput from '../../activityQuillInput';
import { validateNameField } from '../../../utils/constants/validation';

const ActivityAudio: React.FC<IActivityAudioProps> = ({ handleSubmit, setContent, setHeading, heading, content, showProgress, uploaded, handleAudioUpload, audioName, validateFile, s3key }) => {

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      heading: "",
      activityAudio: "",
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

      </Stack>

      <Stack spacing={10}>

        <FormControl>
          <FormLabel>Content</FormLabel>
          <QuillActivityInput value={content} setValue={setContent} />
        </FormControl>

      </Stack>

      <br /><br />

      <Stack spacing={1}>
        <FormControl className={styles.fileUploadWrapper}>
          <FormLabel className={styles.formLabels}>Audio Link<span className={styles.requiredField}>*</span></FormLabel>
          <input
            type="file"
            id="activity-audio-file"
            style={{ display: "none" }}
            accept="audio/mp3"
            onClick={(e: any) => { e.target.value = null; }}
            {...register('activityAudio', {
              onChange: handleAudioUpload,
              required: {
                value: true,
                message: "Please Upload Audio!"
              },
              validate: (e) => validateFile(e)
            })}
          />
          <div className={styles.fileUploadSubWrapper}>
            <Input placeholder='Select Audio file'
              variant="soft"
              className={styles.uploadInput}
              value={audioName}
            />
            <label htmlFor="activity-audio-file" className={styles.uploadButton}>Upload Audio</label>
          </div>

          {showProgress && <FileUploader uploaded={uploaded} />}
          <span className={[styles.error, !errors.activityAudio && styles.errorVisibility].join(" ")}>{errors?.activityAudio?.message || <>&nbsp;</>}</span>
        </FormControl>
        <Button type="submit" disabled={!heading || !s3key || !content || !!errors?.activityAudio?.message || !!errors?.heading?.message}>Submit</Button>
      </Stack>
    </form>
  )
}

export default ActivityAudio