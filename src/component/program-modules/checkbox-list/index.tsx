import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import { ICheckboxListProps } from './checkbox.types';
import styles from "./checkbox-list.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { v4 as uuidv4 } from 'uuid';
import QuillActivityInput from '../../activityQuillInput';
import { validateNameField } from '../../../utils/constants/validation';
import { useForm } from 'react-hook-form';

const CheckboxList: React.FC<ICheckboxListProps> = ({ handleSubmit, setContent, content, pageHeading, setPageHeading, setOptions, options, handleInputChange }) => {

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
    <div className={styles.container}>
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

          <FormControl className={styles.formControlQuill}>
            <FormLabel>Content</FormLabel>
            <QuillActivityInput value={content} setValue={setContent} />
          </FormControl>

          <div className={styles.optionsContainer}>
            {
              options.map((val: Record<string, string>, index: number) => {
                return (
                  <div className={styles.optionList} key={index}>
                    <FormControl className={styles.options}>
                      <FormLabel>{val.label}</FormLabel>
                      <Input name={`option${index}`} value={val.value} required onChange={e => handleInputChange(e, index)}
                      />
                    </FormControl>

                    <div onClick={() => {
                      handleRemoveItems(val.id);
                    }} className={styles.deleteBtn}>
                      <DeleteRoundedIcon /></div>
                  </div>
                )
              })
            }
          </div>
          <Button type="submit" disabled={!pageHeading || !content}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default CheckboxList