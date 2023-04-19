import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IEmotionIntensityProps } from './emotion-intensity.types';
import { Textarea } from '@mui/joy';
import styles from "./emotion-intensity.module.scss";
import { useForm } from 'react-hook-form';
import { validateNameField } from '../../../utils/constants/validation';
import QuillActivityInput from '../../activityQuillInput';

const EmotionIntensity: React.FC<IEmotionIntensityProps> = ({ handleSubmit, setContent, setHeading, heading, content, setOpen }) => {

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
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
            <FormLabel>Content</FormLabel>
            <QuillActivityInput value={content} setValue={setContent} />
          </FormControl>
          <Button type="submit" disabled={!heading || !content}>Submit</Button>
        </Stack>
      </Stack>
    </form >
  )
}

export default EmotionIntensity;