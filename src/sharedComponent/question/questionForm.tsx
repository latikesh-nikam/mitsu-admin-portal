import { useState } from "react";
import { useForm } from 'react-hook-form';
import { InputLabel, Input, TextareaAutosize } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import style from './questionForm.module.scss';
import Button from "@mui/material/Button";
import OptionsTable from "./optionsTable";
import QuillComp from "../../component/quill";
import { CButton } from "@coreui/react";
import { addQuestionDetails } from "../../service/user.service";
import { toast } from 'react-hot-toast';

type options_type = { text: string, score: string };

const QuestionForm = (props: any) => {
  const { setQuestionForm } = props;
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const [question, setQuestion] = useState({
    heading: "",
    description: "",
    title: "",
    type: "",
    category: "",
    options_type: "text",
    options: {},
    explanation: "",
  });

  let [optionArr, setOptionArr] = useState<options_type[]>([]);

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
    optionArr = optionArr?.filter(function(item) {
      return item.text !== option.text
    })
    setOptionArr(optionArr)
  }

  const onSubmit = async () => {
    let data = {
      ...question,
      asset_links: {
        video_link: "",
        audio_link: "",
        image_link: "",
      }
    }
    const res = await addQuestionDetails(data)
    if(res){
      toast.success("Question Added Successfully")
    } else {
      toast.error("Something went wrong!")
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
            {...register("heading", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setQuestion(
                {
                  ...question,
                  heading: event.target.value as string
                }
              )
            })}
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <QuillComp question={question} setQuestion={setQuestion} />
        </div>
        <div className={style.fieldExtraWrapper}>
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
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Type</InputLabel>
          <select
            value={question.type}
            className={style.selectWrapper}
            {...register("type", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setQuestion(
                {
                  ...question,
                  type: event.target.value as string
                }
              )
            })}
          >
            <option value={'PreOnboard'}>Pre-Onboard</option>
            <option value={'PostOnboard'}>Post-Onboard</option>
          </select>
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Category</InputLabel>
          <select
            value={question.category}
            className={style.selectWrapper}
            {...register("category", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setQuestion(
                {
                  ...question,
                  category: event.target.value as string
                }
              )
            })}
          >
            <option value={'Anxiety'}>Anxiety</option>
            <option value={'Depression'}>Depression</option>
            <option value={'Other'}>Other</option>
          </select>
        </div>
        <div className={style.fieldWrapper}>
          <InputLabel>Option Type</InputLabel>
          <select
            value={question.options_type}
            className={style.selectWrapper}
            {...register("options_type", {
              required: "This is required field",
              onChange: (event: SelectChangeEvent) => setQuestion(
                {
                  ...question,
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
      {((question.options_type !== 'text') && (question.options_type !== "")) && (
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
                  onChange: (e: any) => setOptionVal({ ...optionVal, text: e.target.value })
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
                  onChange: (e: any) => setOptionVal({ ...optionVal, score: e.target.value })
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
            <CButton color="dark" className="m-1" onClick={() => setQuestionForm(false)}>
                Close
            </CButton>
            <CButton color="primary" type="submit" className="m-1">Submit</CButton>
        </div>
      </form>
    </>
  )
};

export default QuestionForm;
