import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import { ITextIntroProps } from './text-intro.types';
import QuillComp from '../../quill';
import styles from "./text-intro.module.scss";
import { Input } from '@mui/joy';

const TextIntro: React.FC<ITextIntroProps> = ({ handleSubmit, setPageHeading, setContentHeading, pageHeading, contentHeading, setContentIntro, contentIntro }) => {
  return (
    <div className={styles.optionContainer}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={10}>

          <FormControl>
            <FormLabel>Page Heading</FormLabel>
            <Input name="name" autoFocus required value={pageHeading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPageHeading(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Content Heading</FormLabel>
            <Input name="content_heading" autoFocus required value={contentHeading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentHeading(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Content</FormLabel>
            <QuillComp question={contentIntro} setQuestion={setContentIntro} />
          </FormControl>

          <Button type="submit" disabled={!pageHeading || !contentHeading || !contentIntro}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default TextIntro