import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IEmotionIntensityProps } from './emotion-intensity.types';
import { Textarea } from '@mui/joy';
import styles from "./emotion-intensity.module.scss";

const EmotionIntensity: React.FC<IEmotionIntensityProps> = ({ handleSubmit, setContent, setHeading, heading, content, setOpen }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.optionContainer}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Page Heading</FormLabel>
          <Input name="pageHeading" autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />
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

export default EmotionIntensity;