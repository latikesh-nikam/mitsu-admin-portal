import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import styles from "./thinking.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IThinkingTrapsProps } from './thinking.types';
import { Textarea } from '@mui/joy';

const ThinkingTraps: React.FC<IThinkingTrapsProps> = ({ handleSubmit, setHeading, setQuestionText, questionText, heading, options, setOptions, handleInputChange, }) => {

  const handleAddOption = () => {
    const values = [...options];
    values.push({});
    setOptions(values);
  };

  const handleRemoveItems = (index: number) => {
    const values = [...options];
    values.splice(index, 1);
    setOptions(values);
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
            <FormLabel>Content Heading</FormLabel>
            <Input name="page-heading" autoFocus required value={heading} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Content Text</FormLabel>
            <Input name="questionText" required value={questionText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)} />
          </FormControl>

          <div>
            {
              options.map((val: any, index: number) => {
                return (
                  <div key={index} className={styles.carousel}>
                    <div className={styles.deleteContainer}>
                      <FormLabel>Selection-{index + 1}</FormLabel>
                      <div onClick={() => {
                        handleRemoveItems(index);
                      }} className={styles.deleteBtn}>
                        <DeleteRoundedIcon /></div>
                    </div>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input name={`name${index + 1}`} autoFocus required value={val[`name${index + 1}`]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea size="lg" variant="soft" name={`description${index + 1}`} required value={val[`description${index + 1}`]} onChange={(e: any) => handleInputChange(e, index)} />
                    </FormControl>

                  </div>
                )
              })
            }
          </div>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default ThinkingTraps