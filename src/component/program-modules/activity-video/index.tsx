import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Textarea } from '@mui/joy';
import { IActivityVideoProps } from './activity-video.types';
import FileUploader from '../../file-uploader';

const ActivityVideo: React.FC<IActivityVideoProps> = ({ handleSubmit, setContent, setHeading, heading, content, handleFileChange, setOpen }) => {

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Heading</FormLabel>
          <Input name="heading" value={heading} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea size="lg" variant="soft" name="content" required value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
        </FormControl>
        <FileUploader
          name="file"
          accept=".mp4, .mkv"
          handleOnChange={handleFileChange}
          isRequired={true} label="Video Link"
        />

        <Button type="submit" disabled={!heading || !content}>Submit</Button>
      </Stack>
    </form >
  )
}

export default ActivityVideo