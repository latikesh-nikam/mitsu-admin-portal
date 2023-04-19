import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import styles from "./grounding.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IGroundingExerciseProps } from './grounding.types';
import { Textarea } from '@mui/joy';
import CustomSelect from '../../select';
import { subScreensDropdown } from './grounding.data';
import { validateNameField } from '../../../utils/constants/validation';
import { useForm } from 'react-hook-form';
import QuillActivityInput from '../../activityQuillInput';

const GroundingExercise: React.FC<IGroundingExerciseProps> = ({ handleSubmit, setHeading, setQuestionText, questionText, heading, options, setOptions, handleInputChange, handleChangeSelect, selectedOptions }) => {

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
        Add option
      </Button>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>

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

                    <FormControl className={styles.formControl}>
                      <FormLabel className={styles.formLabels}>Sub Screens<span className={styles.requiredField}>*</span></FormLabel>
                      <CustomSelect
                        name="sub-screens"
                        isMulti={false}
                        dropdownOptions={subScreensDropdown}
                        handleChangeSelect={(e: any, actionMeta: any, activityFieldCount: number, dayCount: number) => handleChangeSelect(e, actionMeta, activityFieldCount, index)}
                        isAutoFocus={false}
                        isSearchable={false}
                        menuPlacement="bottom"
                        selectedOptions={selectedOptions}
                      />
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

export default GroundingExercise