import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Add } from '@mui/icons-material';
import { IMultipleQuizProps } from './quiz.types';
import styles from "./quiz.module.scss";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CustomSelect from '../../select';
import { quizDropdown } from './quiz.data';
import QuillComp from '../../quill';

const Quiz: React.FC<IMultipleQuizProps> = ({ handleSubmit, setHeading, setQuestionText, questionText, heading, selectedOptions, setSelectedOptions, handleCorrectAnswerSelect, options, setOptions, handleInputChange, setOpen, handleQuizTypeSelect, quizOptions }) => {

  const handleAddOption = () => {
    const values = [...options];
    values.push({ id: options.length, label: `Option-${options.length + 1}`, value: `option${options.length + 1}` });
    setOptions(values);
  };

  const handleRemoveItems = (index: number) => {
    const values = [...options];
    for (let i = index + 1; i < values.length; i++) {
      values[i] = { id: values[i]?.id - 1, label: "Option-" + (values[i].id), value: "option" + (values[i].id) }
    }
    values.splice(index, 1);
    setOptions(values);
    setSelectedOptions(values);
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
        <Stack spacing={10}>

          <FormControl>
            <FormLabel>Page Heading</FormLabel>
            <QuillComp question={heading} setQuestion={setHeading} />
          </FormControl>

          <FormControl>
            <FormLabel>Question Text</FormLabel>
            <QuillComp question={questionText} setQuestion={setQuestionText} />
          </FormControl>

          <FormControl>
            <FormLabel>Quiz Type-</FormLabel>
            <CustomSelect
              isMulti={false}
              dropdownOptions={quizDropdown}
              handleChangeSelect={handleQuizTypeSelect}
              isAutoFocus={false}
              isSearchable={false}
              selectedOptions={quizOptions}
              menuPlacement={"bottom"}
            />
          </FormControl>
        </Stack>

        <Stack spacing={2}>
          {
            options.map((val: Record<string, string>, index: number) => {
              return (
                <div className={styles.optionList} key={index}>
                  <FormControl className={styles.options}>
                    <FormLabel>Option-{index + 1}</FormLabel>
                    <Input name={`option${index + 1}`} value={val[`option${index + 1}`]} required onChange={e => handleInputChange(e, index)} />
                  </FormControl>
                  <div onClick={() => {
                    handleRemoveItems(index);
                  }} className={styles.deleteBtn}>
                    <DeleteRoundedIcon /></div>
                </div>
              )
            })
          }
          <FormControl>
            <FormLabel>Correct Answer</FormLabel>
            <CustomSelect
              isMulti={quizOptions?.id === 1 ? false : true}
              dropdownOptions={options}
              handleChangeSelect={handleCorrectAnswerSelect}
              isAutoFocus={false}
              isSearchable={false}
              selectedOptions={selectedOptions}
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default Quiz