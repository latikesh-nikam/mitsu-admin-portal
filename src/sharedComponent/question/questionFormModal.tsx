import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import QuestionForm from "./questionForm";

const QuestionFormModal = (props: any) => {
  const { showQuestionForm, setQuestionForm } = props;
  return (
    <>
      <CModal scrollable visible={showQuestionForm} onClose={() => setQuestionForm(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Add Question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <QuestionForm />
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setQuestionForm(false)}>
            Close
          </CButton>
          <CButton color="primary">Submit</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default QuestionFormModal;
