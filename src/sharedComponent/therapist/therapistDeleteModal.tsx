import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';

const TherapistDeleteModal = (props: any) => {
  const { therapistDelete, setTherapistDelete, handleTherapistDelete } = props;
  return (
    <>
      <CModal scrollable visible={therapistDelete} onClose={() => setTherapistDelete(false)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this Therapist.
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setTherapistDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => handleTherapistDelete()}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default TherapistDeleteModal;
