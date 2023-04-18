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
          <FormControl>
            <FormLabel>Page Heading</FormLabel>

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
        <br />
        <Stack spacing={10}>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <QuillComp question={content} setQuestion={setContent} />
          </FormControl>
          <Button type="submit" disabled={!heading || !content}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default TextInput
