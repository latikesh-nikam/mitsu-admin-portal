import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import { ITextInputProps } from './text-input.types';
import styles from "./text-input.module.scss";
import QuillComp from '../../quill';
import { Input } from '@mui/joy';
import { useForm } from 'react-hook-form';
import { validateNameField } from '../../../utils/constants/validation';
import QuillActivityInput from '../../activityQuillInput';

const TextInput: React.FC<ITextInputProps> = ({ handleSubmit, setContent, setHeading, heading, content, setOpen }) => {

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
    <div className={styles.optionContainer}>
      <form onSubmit={handleSubmit}>
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
            <FormLabel className={styles.formLabels}>Content<span className={styles.requiredField}>*</span></FormLabel>
            <QuillActivityInput value={content} setValue={setContent} />
          </FormControl>
          <Button type="submit" disabled={!heading || !content || !!errors?.heading?.message}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default TextInput
