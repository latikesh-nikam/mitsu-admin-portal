import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Textarea, Typography } from '@mui/joy';
import { IActivityAudioProps } from './activity-audio.types';
import FileUploader from '../../file-uploader';
import LinearProgress from '@mui/joy/LinearProgress';

const ActivityAudio: React.FC<IActivityAudioProps> = ({ handleSubmit, setContent, setHeading, heading, content, handleFileChange, showProgress, uploaded, setOpen }) => {

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
        <FormControl>
          <FileUploader
            name="file"
            accept=".mp3"
            handleOnChange={handleFileChange} label="Audio Link"
          />
          {showProgress &&
            <LinearProgress
              determinate
              variant="soft"
              color="primary"
              size="lg"
              thickness={32}
              value={uploaded}
              sx={{
                '--LinearProgress-radius': '0px',
                '--LinearProgress-progressThickness': '24px',
                boxShadow: 'sm',
                borderColor: 'neutral.500',
              }}
            >
              <Typography
                level="body3"
                fontWeight="xl"
                textColor="common.white"
                sx={{ mixBlendMode: 'difference' }}
              >
                Uploading {`${uploaded}%...`}
              </Typography>
            </LinearProgress>
          }
        </FormControl>

        <Button type="submit" disabled={!heading || !content}>Submit</Button>
      </Stack>
    </form >
  )
}

export default ActivityAudio