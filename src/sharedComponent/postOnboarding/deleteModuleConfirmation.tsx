import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';

const DeleteModuleConfirmation = (props: any) => {
  const { showDelete, setDelete, handleDeleteModule } = props;
  return (
    <>
      <CModal scrollable visible={showDelete} onClose={() => setDelete(false)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this Module.
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleDeleteModule()}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default DeleteModuleConfirmation;
