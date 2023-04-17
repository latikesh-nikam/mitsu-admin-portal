import { CModal, CModalHeader, CModalBody, CModalTitle } from '@coreui/react';
import TherapistAddForm from './therapistAddForm';

const TherapistAddModal = (props: any) => {
  const { addTherapist, setTherapist, setData } = props;
  return (
    <>
      <CModal scrollable visible={addTherapist} onClose={() => setTherapist(false)}>
        <CModalHeader>
          <CModalTitle>Add Therapist</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <TherapistAddForm setTherapist={setTherapist} setData={setData} />
        </CModalBody>
      </CModal>
    </>
  )
};

export default TherapistAddModal;
