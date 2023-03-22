import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import QuestionEditForm from './questionEditForm';

const QuestionEditModal = (props: any) => {
  const { questionEdit, setQuestionEdit, editFormDetails, setEditFormDetails } = props;
  return (
    <>
      <CModal scrollable visible={questionEdit} onClose={() => setQuestionEdit(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Edit Question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <QuestionEditForm editFormDetails={editFormDetails} setEditFormDetails={setEditFormDetails}/>
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setQuestionEdit(false)}>
            Close
          </CButton>
          <CButton color="primary">Edit</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default QuestionEditModal;
