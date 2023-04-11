import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { ITextIntroProps } from './text-intro.types';
import Textarea from '@mui/joy/Textarea';

const TextIntro: React.FC<ITextIntroProps> = ({ handleSubmit, setPageHeading, setContentHeading, pageHeading, contentHeading, setContentIntro, contentIntro, setOpen }) => {

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Page Heading</FormLabel>
          <Input name="page-heading" autoFocus required value={pageHeading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPageHeading(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Content Heading</FormLabel>
          <Input name="content-heading" required value={contentHeading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentHeading(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea size="lg" variant="soft" name="content" required value={contentIntro} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContentIntro(e.target.value)} />
        </FormControl>

        <Button type="submit" disabled={!pageHeading || !contentHeading || !contentIntro}>Submit</Button>
      </Stack>
    </form >
  )
}

export default TextIntro