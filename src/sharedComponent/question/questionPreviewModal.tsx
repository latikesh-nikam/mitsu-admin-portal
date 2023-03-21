import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import QuestionPreview from "./questionPreview";

const QuestionPreviewModal = (props: any) => {
  const { questionPreview, setQuestionPreview, questionDetails } = props;
  return (
    <>
      <CModal scrollable visible={questionPreview} onClose={() => setQuestionPreview(!questionPreview)}>
        <CModalHeader>
          <CModalTitle>{questionDetails?.heading} - {questionDetails?.category}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <QuestionPreview questionDetails={questionDetails} />
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setQuestionPreview(!questionPreview)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default QuestionPreviewModal;
