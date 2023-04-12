import { useEffect, useState } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import ControlledCheckbox from '../../../../../sharedComponent/modules/moduleCheckBox';
import { FormControl, FormLabel, Input, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    setQuizFormData: (e: any) => void
    postOnboardingQuestions: any
}

const ShowQuizQuesModal: React.FC<Props> = ({ open, setOpen, setQuizFormData, postOnboardingQuestions }) => {
  const [questionIds, setQuestionIds] = useState([])
  const [heading, setHeading] = useState<string>("")
  const submitQuestionDetails = () => {
    setQuizFormData({
      contentHeading: heading,
      questionIds: questionIds
    })
    setHeading("")
    setQuestionIds([])
    setOpen(false)
    toast.success("Quiz question submitted successfully!!")
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ width: 800, height: "fit-content" }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Quiz
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Add Questions to Quiz
          </Typography>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Page Heading</FormLabel>
              <Input name="pageHeading" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeading(e.target.value)} />
            </FormControl>
          </Stack>
          <FormLabel>Questions</FormLabel>
          {postOnboardingQuestions?.map((item: any, index: number) => (
            <div style={{display: 'flex'}}>
              <ControlledCheckbox
                  moduleDetails={item}
                  moduleIds={questionIds} 
                  setModuleIds={setQuestionIds}
              />
              &nbsp;<div style={{paddingTop: '0.5rem'}}>{item.heading}</div>
            </div> 
          ))}
          <CButton color="primary" onClick={() => submitQuestionDetails()}>
            Add Questions
          </CButton>
        </ModalDialog>
      </Modal>
    </>
  )
};

export default ShowQuizQuesModal;
