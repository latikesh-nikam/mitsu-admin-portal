import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { IFileUploaderProps } from './file-uploader.types';

const FileUploader: React.FC<IFileUploaderProps> = ({ name, isRequired = true, isMultiple, handleOnChange, label }) => {
  return (
    <FormControl>
      <FormLabel>{label}<span style={{color: 'red', fontFamily: 'large', marginLeft: '0.10rem'}}>*</span></FormLabel>
      <Input
        name={name}
        type="file"
        required={isRequired}
        onChange={handleOnChange}
      />
    </FormControl>
  )
}

export default FileUploader