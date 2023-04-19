import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IFearLadderProps } from './fear-ladder.types';
import styles from "./fear-ladder.module.scss";
import QuillComp from '../../quill';
import { useForm } from 'react-hook-form';
import { validateNameField } from '../../../utils/constants/validation';
import QuillActivityInput from '../../activityQuillInput';

const FearLadder: React.FC<IFearLadderProps> = ({ handleSubmit, setContent, setHeading, heading, content, setOpen, completionTime, setCompletionTime }) => {

  const [error, setError] = useState("");

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      heading: "",
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const handleNumberValidation = (value: string) => {
    if (Number(value) <= 0) {
      setError("Completion Time can not be less than or equal to zero")
    }
    else if (!new RegExp(/^[0-9\b]+$/).test(value)) {
      setError("Duration Time can only be integer")
    }
    else { setError("") }
  };

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

        <FormControl>
          <FormLabel>Completion Steps</FormLabel>
          <Input type="number" name="completionTime" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCompletionTime(Number(e.target.value));
            handleNumberValidation(e.target.value);
          }} value={completionTime} />

          <span className={[styles.error, !error && styles.errorVisibility].join(" ")}>{error || <>&nbsp;</>}</span>
        </FormControl>

        <FormControl className={styles.quillContainer}>
          <FormLabel>Content</FormLabel>
          <QuillActivityInput value={content} setValue={setContent} />
        </FormControl>

        <Button type="submit" disabled={!heading || !content}>Submit</Button>
      </Stack>
    </form >
  )
}

export default FearLadder