import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import styles from "./swipe-help.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Textarea } from '@mui/joy';
import { ISwipeHelpProps } from './swipe-help.types';

const SwipeHelp: React.FC<ISwipeHelpProps> = ({ handleSubmit, setOptions, options, handleInputChange, setOpen }) => {

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
        Add Carousel
      </Button>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {
            options.map((val: any, index: number) => {
              return (
                <div key={index} className={styles.carousel}>
                  <div className={styles.deleteContainer}>
                    <FormLabel>Carousel-{index + 1}</FormLabel>
                    <div onClick={() => {
                      handleRemoveItems(index);
                    }} className={styles.deleteBtn}>
                      <DeleteRoundedIcon /></div>
                  </div>
                  <FormControl>
                    <FormLabel>Carousel Heading</FormLabel>
                    <Input name={`carousel-heading${index + 1}`} autoFocus required value={val[`carousel${index + 1}`]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Textarea size="lg" variant="soft" name={`carousel-content${index + 1}`} required value={val[`carousel-content${index + 1}`]} onChange={(e: any) => handleInputChange(e, index)} />
                  </FormControl>

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

export default SwipeHelp