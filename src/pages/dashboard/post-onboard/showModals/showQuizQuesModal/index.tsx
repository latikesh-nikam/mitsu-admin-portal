import { useState } from 'react';
import { CButton } from '@coreui/react';
import ControlledCheckbox from '../../../../../sharedComponent/modules/moduleCheckBox';
import { FormControl, FormLabel, Input, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { validateNameField } from '../../../../../utils/constants/validation';
import styles from "./quiz.module.scss";
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setQuizFormData: (e: any) => void
  postOnboardingQuestions: any
  activity: string
  quizArr: any
  setQuizArr: (e: any) => void
}

const ShowQuizQuesModal: React.FC<Props> = ({ open, setOpen, setQuizFormData, postOnboardingQuestions, activity, quizArr, setQuizArr }) => {
  const [questionIds, setQuestionIds] = useState([])
  const [heading, setHeading] = useState<string>("")

  const submitQuestionDetails = () => {
    setQuizFormData({
      contentHeading: heading,
      questionIds: questionIds
    })
    if (activity === 'GroundingExercise') {
      setQuizArr((quizArr: any) => [...quizArr, { name: "Quiz", type: "Quiz", content_heading: heading, questionIds: questionIds, isSubType: true }])
    }
    setHeading("")
    setQuestionIds([])
    setOpen(false)
    toast.success("Quiz question submitted successfully!!")
  };

  const {
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      pageHeading: ""
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  return (
    <div className='overflow-y-scroll'>
    <Modal open={open} onClose={() => setOpen(false)} className={styles.container}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ width: 800, height: "fit-content" }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Quiz
        </Typography>
        <Typography id="basic-modal-dialog-description">
          Add Questions to Quiz
        </Typography>
        <Stack spacing={2}>

          <FormControl className={styles.formControl}>
            <FormLabel className={styles.formLabels}>Page Heading<span className={styles.requiredField}>*</span></FormLabel>
            <Input value={heading} autoFocus {...register("pageHeading", {
              required: {
                value: true,
                message: "Please enter Module Name!"
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value),
              maxLength: {
                value: 50,
                message: "Maximum length exceeded"
              },
              validate: validateNameField("Page Heading")
            })}
            />

            <span className={[styles.error, !errors?.pageHeading && styles.errorVisibility].join(" ")}>{errors?.pageHeading?.message || <>&nbsp;</>}</span>

          </FormControl>

        </Stack>
        <FormLabel>Questions</FormLabel>

        {
          postOnboardingQuestions?.map((item: any, index: number) => (
            <div style={{ display: 'flex' }} key={index}>
              <ControlledCheckbox
                moduleDetails={item}
                moduleIds={questionIds}
                setModuleIds={setQuestionIds}
              />
              &nbsp;<div style={{ paddingTop: '0.5rem' }}>{item.title}</div>
            </div>
          ))}
        <CButton color="primary" onClick={() => submitQuestionDetails()} disabled={!heading || (questionIds.length === 0)}>
          Add Questions
        </CButton>
      </ModalDialog>
    </Modal>
    </div>
  )
};

export default ShowQuizQuesModal;
