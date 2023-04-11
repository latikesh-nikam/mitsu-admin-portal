import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';

const PatientDeleteModal = (props: any) => {
  const { patientDelete, setPatientDelete } = props;
  return (
    <>
      <CModal scrollable visible={patientDelete} onClose={() => setPatientDelete(false)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete this Patient.
        </CModalBody>
        <CModalFooter>
          <CButton color="dark" onClick={() => setPatientDelete(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => setPatientDelete(false)}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default PatientDeleteModal;
