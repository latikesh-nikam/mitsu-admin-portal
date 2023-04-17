import React, { useId } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import { ICheckboxListProps } from './checkbox.types';
import styles from "./checkbox-list.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Textarea } from '@mui/joy';
import { v4 as uuidv4 } from 'uuid';

const CheckboxList: React.FC<ICheckboxListProps> = ({ handleSubmit, setContent, content, pageHeading, setPageHeading, setOptions, options, handleInputChange, setOpen }) => {

  const handleAddOption = () => {
    const values = [...options];
    values.push({ id: uuidv4(), label: `Option-${options.length + 1}`, value: '' });
    setOptions(values);
  };

  const handleRemoveItems = (index: string) => {
    const values = [...options];
    const updatedOptions = values.filter((option) => option.id !== index);
    setOptions(updatedOptions.map((e: any, index) => ({ ...e, label: `Option-${index + 1}` })));
  };

  return (
    <div className={styles.optionContainer}>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={handleAddOption}
        type="button"
        className={styles.addBtn}
      >
        Add option
      </Button>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Page Heading</FormLabel>
            <Input name="page-heading" autoFocus required value={pageHeading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPageHeading(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea size="lg" variant="soft" name="content" required value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
          </FormControl>

          {
            options.map((val: Record<string, string>, index: number) => {
              return (
                <div className={styles.optionList} key={index}>
                  <FormControl className={styles.options}>
                    <FormLabel>{val.label}</FormLabel>

                    <Input name={`option${index}`} value={val.value} required onChange={e => handleInputChange(e, index)} />
                  </FormControl>

                  <div onClick={() => {
                    handleRemoveItems(val.id);
                  }} className={styles.deleteBtn}>
                    <DeleteRoundedIcon /></div>
                </div>
              )
            })
          }

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default CheckboxList