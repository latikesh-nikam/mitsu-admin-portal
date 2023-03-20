import React, { useState } from "react";
import { useForm, Resolver } from 'react-hook-form';
import { InputLabel , Input } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import style from './questionForm.module.scss';
import Button from "@mui/material/Button";
import { addQuestionDetails } from "../../service/user.service";

type optionType = {text:string,score:number};

const QuestionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ question, setQuestion] = useState({
    title: "",
    category: "Anxiety",
    type: "MCQ"
  });

  const [optionArr, setptionArr] = useState<optionType[]>([]);

  const [ optionVal, setOptionVal] = useState({
    text: "",
    score: 0,
  });

  const handleOption = () => {
    optionArr.push({text: optionVal.text, score: optionVal.score})
    setOptionVal({
      ...optionVal,
      text: "",
      score: 0
    })
  }

  const submitQuestion = async () => {
    let options:{[key:string]:number} = {}
    if(optionArr.length > 0){
      optionArr.map((option:optionType ) => {
        let optionText = option.text
        options[optionText] = option.score
      })
    }
    let data = {
      "title": question.title,
      "category": question.category,
      "options": {
        "Yes": 0,
        "No": 1
      }
    }
    const response = await addQuestionDetails(data);
    setQuestion({
      ...question,
      title: "",
      category: "Anxiety",
      type: "MCQ"
    })
  }

  return (
    <>
      <form>
        <InputLabel>Title</InputLabel>
        <Input
          type="text"
          placeholder="Enter title"
          fullWidth={true}
          required={true}
          {...register("title", {
            required: "This is required field",
            onChange: (event: SelectChangeEvent) => setQuestion(
              {
                ...question,
                title: event.target.value as string
              }
            )
          })}
        />
        <br/><br/>
        <Box className={style.quesTypeWrapper}>
          <Box>
            <InputLabel>Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={question.category}
              label="catgeory"
              onChange={(event: SelectChangeEvent) => setQuestion(
                {
                  ...question,
                  category: event.target.value as string
                }
              )}
            >
              <MenuItem value={'Anxiety'}>Anxiety</MenuItem>
              <MenuItem value={'Depression'}>Depression</MenuItem>
            </Select>
          </Box>
          <Box>
            <InputLabel>Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={question.type}
              label="type"
              onChange={(event: SelectChangeEvent) => setQuestion(
                {
                  ...question,
                  type: event.target.value as string
                }
              )}
            >
              <MenuItem value={'MCQ'}>MCQ</MenuItem>
              <MenuItem value={'Yes/No'}>Yes/No</MenuItem>
              <MenuItem value={'Text'}>Text</MenuItem>
            </Select>
          </Box>
        </Box>
      </form>
      <InputLabel>Enter Options</InputLabel><br/>
      {optionArr?.map((option: any) => (
        <li>{option.text} - {option.score}</li>
      ))}
      <Box className="quesTypeWrapper">
        <Box>
          <Input
            type="text"
            placeholder="Enter Options"
            style={{width: '15rem'}}
            value={optionVal.text}
            {...register("optionText", {
              required: "This is required field",
              onChange: (e: any) => setOptionVal({...optionVal, text: e.target.value})
            })}
          />
        </Box>
        <Box>
          <Input
            type="number"
            placeholder="Enter Score"
            style={{width: '8rem'}}
            value={optionVal.score}
            {...register("optionScore", {
              required: "This is required field",
              onChange: (e: any) => setOptionVal({...optionVal, score: Number(e.target.value)})
            })}
          />
        </Box>
        <Button variant="outlined" onClick={() => handleOption()}>Add</Button>
      </Box>
      {/*<Button variant="contained" onClick={() => submitQuestion()}>Submit</Button>*/}
    </>
  )
};

export default QuestionForm;
