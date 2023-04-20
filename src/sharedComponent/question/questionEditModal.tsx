import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import QuestionEditForm from './questionEditForm';

const QuestionEditModal = (props: any) => {
  const { questionEdit, setQuestionEdit, editFormDetails, setEditFormDetails, reloadQuestionDetails } = props;
  return (
    <>
      <CModal scrollable visible={questionEdit} onClose={() => setQuestionEdit(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Edit Question</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <QuestionEditForm editFormDetails={editFormDetails} setEditFormDetails={setEditFormDetails} setQuestionEdit={setQuestionEdit} reloadQuestionDetails={reloadQuestionDetails} />
        </CModalBody>
      </CModal>
    </>
  )
};

export default QuestionEditModal;
