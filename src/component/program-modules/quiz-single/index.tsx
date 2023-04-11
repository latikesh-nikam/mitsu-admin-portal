import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { IQuizSingleChoiceProps } from './quiz-single.types';
import styles from "./quiz-single.module.scss";
import { Textarea } from '@mui/joy';
import CustomSelect from '../../select';
import { optionSingleChoice } from './quiz-single.data';

const QuizSingleChoice: React.FC<IQuizSingleChoiceProps> = ({ handleSubmit, headingQS, setHeadingQS, setOption1, setOption2, setOption3, setOption4, setTextExplanation, option1, option2, option3, option4, textExplanation, questionText, setQuestionText, handleChangeSelect, selectedOptions, setOpen, duration, setDuration }) => {

  return (
    <div className={styles.optionContainer}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Heading</FormLabel>
            <Input name="heading" value={headingQS} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeadingQS(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Question Text</FormLabel>
            <Input name="content" required value={questionText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Option-1</FormLabel>
            <Input name="option1" value={option1} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOption1(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Option-2</FormLabel>
            <Input name="option2" value={option2} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOption2(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Option-3</FormLabel>
            <Input name="option3" value={option3} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOption3(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Option-4</FormLabel>
            <Input name="option4" value={option4} autoFocus required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOption4(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Correct Answer Option</FormLabel>
            <CustomSelect
              name="correctAnswer"
              isMulti={false}
              dropdownOptions={optionSingleChoice}
              handleChangeSelect={handleChangeSelect}
              isAutoFocus={false}
              isSearchable={false}
              selectedOptions={selectedOptions}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Text explanation</FormLabel>
            <Textarea size="lg" variant="soft" name="heading" value={textExplanation} autoFocus required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextExplanation(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Duration</FormLabel>
            <Input name="textIntro-duration" required value={duration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)} placeholder="Enter duration in min" />
          </FormControl>

          <Button type="submit" disabled={!headingQS || !option1 || !option2 || !option3 || !option4 || !selectedOptions || !textExplanation || !duration}>Submit</Button>
        </Stack>
      </form >
    </div>
  )
}

export default QuizSingleChoice