import React from 'react';
import { IFileUploaderProps } from './file-uploader.types';
import { LinearProgress, Typography } from '@mui/joy';

const FileUploader: React.FC<IFileUploaderProps> = ({ uploaded }) => {
  return (
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
  )
}

export default FileUploader