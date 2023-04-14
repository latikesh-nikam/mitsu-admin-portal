import { CModal, CModalHeader, CModalBody, CModalTitle } from '@coreui/react';
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
          <QuestionForm setQuestionForm={setQuestionForm} />
        </CModalBody>
      </CModal>
    </>
  )
};

export default QuestionFormModal;
