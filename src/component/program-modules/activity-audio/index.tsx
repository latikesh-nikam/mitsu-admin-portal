import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Textarea } from '@mui/joy';
import { IActivityAudioProps } from './activity-audio.types';
import FileUploader from '../../file-uploader';
import styles from "./audio.module.scss";
import { useForm } from 'react-hook-form';

const ActivityAudio: React.FC<IActivityAudioProps> = ({ handleSubmit, setContent, setHeading, heading, content, showProgress, uploaded, handleAudioUpload, audioName, validateFile, error }) => {
  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      activityAudio: "",
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
          <span className={[styles.error, !errors.activityAudio && styles.errorVisibility].join(" ")}>{errors?.activityAudio?.message || error || <> & nbsp;</>}</span>
        </FormControl>

        <Button type="submit" disabled={!!!heading || !!!content || showProgress}>Submit</Button>
      </Stack>
    </form>
  )
}

export default ActivityAudio