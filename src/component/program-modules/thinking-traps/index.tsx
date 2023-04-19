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
import { validateNameField } from '../../../utils/constants/validation';
import { useForm } from 'react-hook-form';
import QuillActivityInput from '../../activityQuillInput';
import { v4 as uuidv4 } from 'uuid';

const ThinkingTraps: React.FC<IThinkingTrapsProps> = ({ handleSubmit, setHeading, setQuestionText, questionText, heading, options, setOptions, handleInputChange, }) => {

  const handleAddOption = () => {
    const values = [...options];
    values.push({ id: uuidv4(), label: `Selection-${options.length + 1}`, name: "", desc: "" });
    setOptions(values);
  };

  const handleRemoveItems = (index: string) => {
    const values = [...options];
    const updatedOptions = values.filter((option) => option.id !== index);
    setOptions(updatedOptions.map((e: any, index) => ({ ...e, label: `Selection-${index + 1}` })));
  };

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      heading: ""
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
        Add option
      </Button>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl className={styles.formControl}>
            <FormLabel className={styles.formLabels}>Heading<span className={styles.requiredField}>*</span></FormLabel>
            <Input value={heading} autoFocus {...register("heading", {
              required: {
                value: true,
                message: "Please enter Heading!"
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value),
              maxLength: {
                value: 50,
                message: "Maximum length exceeded"
              },
              validate: validateNameField("Heading")
            })}
            />
            <span className={[styles.error, !errors?.heading && styles.errorVisibility].join(" ")}>{errors?.heading?.message || <>&nbsp;</>}</span>
          </FormControl>

          <FormControl className={styles.quillContainer}>
            <FormLabel>Content Text</FormLabel>
            <QuillActivityInput value={questionText} setValue={setQuestionText} />
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
                      <FormLabel>Name</FormLabel>
                      <Input name="name" autoFocus required value={val.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                    </FormControl>

                    <FormControl className={styles.carouselQuill}>
                      <FormLabel>Description</FormLabel>
                      <QuillActivityInput value={val.desc} setValue={(e: any) => handleInputChange(e, index)} />
                    </FormControl>

                  </div>
                )
              })
            }
          </div>
          <Button type="submit" disabled={!heading || !questionText}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default ThinkingTraps