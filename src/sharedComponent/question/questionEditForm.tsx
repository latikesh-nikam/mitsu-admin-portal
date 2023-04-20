import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { InputLabel, Input, TextareaAutosize } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import style from './questionForm.module.scss';
import Button from "@mui/material/Button";
import OptionsTable from "./optionsTable";
import { updateQuestionDetails } from "../../services/service/user.service";
import { toast } from "react-hot-toast";
import { CButton } from "@coreui/react";

type optionType = { text: string, score: string };

const QuestionEditForm = (props: any) => {
  const { editFormDetails, setEditFormDetails, setQuestionEdit, reloadQuestionDetails } = props;
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [question, setQuestion] = useState({
    heading: "",
    description: "",
    title: "",
    type: "",
    category: "",
    optionType: "",
    option: "",
    explanation: "",
  });

  let [optionArr, setOptionArr] = useState<optionType[]>([]);

  const [optionVal, setOptionVal] = useState({
    text: "",
    score: "",
  });

  const handleOption = () => {
    optionArr.push({ text: optionVal.text, score: optionVal.score })
    setOptionVal({
      ...optionVal,
      text: "",
      score: ""
    })
  }

  const handleDeleteOption = (option: any) => {
    optionArr = optionArr?.filter(function (item) {
      return item.text !== option.text
    })
    setOptionArr(optionArr)
  }

  const onSubmit = async () => {
    const res = await updateQuestionDetails(editFormDetails)
    if(res) {
      toast.success("Question Edited Successfully!!!")
      setQuestionEdit(false)
      reloadQuestionDetails()
    } else {
      toast.error('Something went wrong!!')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.fieldWrapper}>
          <InputLabel>Heading</InputLabel>
          <Input
            type="text"
            placeholder="Enter heading"
            fullWidth={true}
            required={true}
            value={editFormDetails?.heading}
            {...register("heading", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setEditFormDetails(
                {
                  ...editFormDetails,
                  heading: event.target.value as string
                }
              )
            })}
          />
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Description</InputLabel>
          <TextareaAutosize
            minRows={4}
            className={style.textField}
            value={editFormDetails?.description}
            {...register("description", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setEditFormDetails(
                {
                  ...editFormDetails,
                  description: event.target.value as string
                }
              )
            })}
          />
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Title</InputLabel>
          <Input
            type="text"
            placeholder="Enter title"
            fullWidth={true}
            required={true}
            value={editFormDetails?.title}
            {...register("title", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setEditFormDetails(
                {
                  ...editFormDetails,
                  title: event.target.value as string
                }
              )
            })}
          />
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Type</InputLabel>
          <select
            value={editFormDetails?.type}
            className={style.selectWrapper}
            {...register("type", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setEditFormDetails(
                {
                  ...editFormDetails,
                  type: event.target.value as string
                }
              )
            })}
          >
            <option value={'PreOnboard'}>PreOnboard</option>
            <option value={'PostOnboard'}>PostOnboard</option>
          </select>
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Category</InputLabel>
          <select
            value={editFormDetails?.category}
            className={style.selectWrapper}
            {...register("category", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setEditFormDetails(
                {
                  ...editFormDetails,
                  category: event.target.value as string
                }
              )
            })}
          >
            <option value={'Anxiety'}>Anxiety</option>
            <option value={'Depression'}>Depression</option>
          </select>
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Option Type</InputLabel>
          <select
            value={editFormDetails?.options_type}
            className={style.selectWrapper}
            {...register("optionType", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setEditFormDetails(
                {
                  ...editFormDetails,
                  options_type: event.target.value as string
                }
              )
            })}
          >
            <option value={'text'}>Text</option>
            <option value={'Single'}>Single</option>
            <option value={'Multiple'}>Multiple</option>
          </select>
        </div>
      <div>
        {((question.optionType !== 'text') && (question.optionType !== "")) && (
          <div>
            <InputLabel>Enter Options</InputLabel>
            {optionArr.length > 0 && (
              <OptionsTable optionArr={optionArr} handleDeleteOption={handleDeleteOption} />
            )}
            <div className={style.optionsWrapper}>
              <span className={style.optionWrapper}>
                <Input
                  type="text"
                  placeholder="Enter Options"
                  value={optionVal.text}
                  {...register("optionText", {
                    required: "This is required field",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOptionVal({ ...optionVal, text: e.target.value })
                  })}
                />
              </span>
              <span className={style.optionWrapper}>
                <Input
                  type="text"
                  placeholder="Enter Score"
                  value={optionVal.score}
                  {...register("optionScore", {
                    required: "This is required field",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOptionVal({ ...optionVal, score: e.target.value })
                  })}
                />
              </span>
              <span className={style.optionWrapper}>
                <Button variant="outlined" onClick={() => handleOption()}>Add</Button>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={style.buttons}>
          <CButton color="dark" className="m-1" onClick={() => setQuestionEdit(false)}>
            Close
          </CButton>
          <CButton color="primary" type="submit" className="m-1">Submit</CButton>
      </div>
      </form>
    </>
  )
};

export default QuestionEditForm;
