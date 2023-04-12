import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IFearLadderProps } from './fear-ladder.types';
import { Textarea } from '@mui/joy';
import styles from "./fear-ladder.module.scss";

const FearLadder: React.FC<IFearLadderProps> = ({ handleSubmit, setContent, setHeading, heading, content, setOpen, completionTime, setCompletionTime }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.optionContainer}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Page Heading</FormLabel>
          <Input name="pageHeading" autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Completion Time</FormLabel>
          <Input type="number" name="completionTime" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompletionTime(Number(e.target.value))} />
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea size="lg" variant="soft" name="content" required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
        </FormControl>


        <Button type="submit" disabled={!heading || !content}>Submit</Button>
      </Stack>
    </form >
  )
}

export default FearLadder