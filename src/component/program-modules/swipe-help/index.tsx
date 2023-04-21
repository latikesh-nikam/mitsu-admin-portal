import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import styles from "./swipe-help.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ISwipeHelpProps } from './swipe-help.types';
import { validateNameField } from '../../../utils/constants/validation';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from "uuid";
import QuillActivityInput from '../../activityQuillInput';
import { isEmpty } from 'lodash';

const SwipeHelp: React.FC<ISwipeHelpProps> = ({ handleSubmit, setOptions, options, handleInputChange, setOpen, pageHeading, setPageHeading, handleDynamicValidation, dynamicError }) => {

  const handleAddOption = () => {
    const values = [...options];
    values.push({ id: uuidv4(), label: `Carousel-${options.length + 1}`, name: "", desc: "" });
    setOptions(values);
  };

  const handleRemoveItems = (index: string) => {
    const values = [...options];
    const updatedOptions = values.filter((option) => option.id !== index);
    setOptions(updatedOptions.map((e: any, index) => ({ ...e, label: `Carousel-${index + 1}` })));
  };

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      heading: "",
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

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
        <Stack>
          <FormControl className={styles.formControl}>
            <FormLabel className={styles.formLabels}>Heading<span className={styles.requiredField}>*</span></FormLabel>
            <Input value={pageHeading} autoFocus {...register("heading", {
              required: {
                value: true,
                message: "Please enter Heading!"
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPageHeading(e.target.value),
              maxLength: {
                value: 50,
                message: "Maximum length exceeded"
              },
              validate: validateNameField("Heading")
            })}
            />
            <span className={[styles.error, !errors?.heading && styles.errorVisibility].join(" ")}>{errors?.heading?.message || <>&nbsp;</>}</span>
          </FormControl>

          <div className={styles.carouselContainer}>
            {
              options.map((val: any, index: number) => {
                return (
                  <div key={index} className={styles.carousel}>
                    <div className={styles.deleteContainer}>
                      <FormLabel>{val.label}</FormLabel>
                      <div onClick={() => {
                        handleRemoveItems(val.id);
                      }} className={styles.deleteBtn}>
                        <DeleteRoundedIcon /></div>
                    </div>

                    <FormControl>
                      <FormLabel className={styles.formLabels}>Heading<span className={styles.requiredField}>*</span></FormLabel>
                      <Input name="name" autoFocus required value={val.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputChange(e, index);
                        handleDynamicValidation(e, index, 'name');
                      }} />

                      <span className={[styles.error, !dynamicError[`name${[index]}`] && styles.errorVisibility].join(" ")}>{dynamicError[`name${[index]}`] || <>&nbsp;</>}</span>
                    </FormControl>

                    <FormControl className={styles.quillContainer}>
                      <FormLabel className={styles.formLabels}>Content<span className={styles.requiredField}>*</span></FormLabel>
                      <QuillActivityInput value={val.desc} setValue={(e: any) => handleInputChange(e, index)} />
                    </FormControl>

                  </div>
                )
              })
            }
          </div>

          <Button type="submit" disabled={!pageHeading || !!errors?.heading?.message || !isEmpty(dynamicError)}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default SwipeHelp