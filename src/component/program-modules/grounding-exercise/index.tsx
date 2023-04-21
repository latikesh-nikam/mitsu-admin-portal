import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import styles from "./grounding.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IGroundingExerciseProps } from './grounding.types';
import CustomSelect from '../../select';
import { subScreensDropdown } from './grounding.data';
import { validateNameField } from '../../../utils/constants/validation';
import { useForm } from 'react-hook-form';
import QuillActivityInput from '../../activityQuillInput';
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from 'lodash';

const GroundingExercise: React.FC<IGroundingExerciseProps> = ({ handleSubmit, setHeading, setQuestionText, questionText, heading, options, setOptions, handleInputChange, handleChangeSelect, handleDynamicValidation, dynamicError }) => {

  const [error, setError] = useState<any>({
    subScreens0: ""
  });

  const handleAddOption = () => {
    const values = [...options];
    values.push({ id: uuidv4(), label: `Selection-${options.length + 1}`, name: "", desc: "", subScreens: {} });
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
            <FormLabel className={styles.formLabels}>Content<span className={styles.requiredField}>*</span></FormLabel>
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
                      <FormLabel className={styles.formLabels}>Name<span className={styles.requiredField}>*</span></FormLabel>
                      <Input name="name" value={val.name} autoFocus onChange={(e) => {
                        handleInputChange(e, index);
                        handleDynamicValidation(e, index, 'name');
                      }}
                      />

                      <span className={[styles.error, !dynamicError[`name${[index]}`] && styles.errorVisibility].join(" ")}>{dynamicError[`name${[index]}`] || <>&nbsp;</>}</span>

                    </FormControl>
                    <FormControl className={styles.carouselQuill}>
                      <FormLabel className={styles.formLabels}>Description</FormLabel>
                      <QuillActivityInput value={val.desc} setValue={(e: any) => handleInputChange(e, index)} />
                    </FormControl>

                    <FormControl className={styles.formControl}>
                      <FormLabel className={styles.formLabels}>Sub Screens<span className={styles.requiredField}>*</span></FormLabel>

                      <CustomSelect
                        name="sub-screens"
                        isMulti={false}
                        dropdownOptions={subScreensDropdown}
                        handleChangeSelect={(e: any, actionMeta: any, activityFieldCount: number, dayCount: number, index: number) => handleChangeSelect(e, actionMeta, activityFieldCount, dayCount, index)}
                        index={index}
                        isAutoFocus={false}
                        isSearchable={false}
                        menuPlacement="bottom"
                        selectedOptions={val.subScreens}
                      />
                      <span className={[styles.error, !isEmpty(val.subScreens) && styles.errorVisibility].join(" ")}>{`Field can not be empty!`}<>&nbsp;</></span>
                    </FormControl>
                  </div>
                )
              })
            }
          </div>
          <Button type="submit" disabled={!!errors?.heading?.message || !heading || !questionText || !(Object.keys(dynamicError).length === 0)}>Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default GroundingExercise