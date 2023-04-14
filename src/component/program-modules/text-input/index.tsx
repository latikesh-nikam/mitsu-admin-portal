import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import { ITextInputProps } from './text-input.types';
import styles from "./text-input.module.scss";
import QuillComp from '../../quill';
import { Input } from '@mui/joy';

const TextInput: React.FC<ITextInputProps> = ({ handleSubmit, setContent, setHeading, heading, content, setOpen }) => {
  return (
    <div className={styles.optionContainer}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={10}>
          <FormControl>
            <FormLabel>Page Heading</FormLabel>

            <Input name="name" autoFocus required value={heading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />

          </FormControl>

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
