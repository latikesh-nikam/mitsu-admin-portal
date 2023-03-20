import React from "react";
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';

const DeleteQuestionConfirmation = (props: any) => {
  const { questionDelete, setQuestionDelete } = props;
  return (
    <>
      <CModal scrollable visible={questionDelete} onClose={() => setQuestionDelete(false)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this Question.
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setQuestionDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => setQuestionDelete(false)}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default DeleteQuestionConfirmation;
