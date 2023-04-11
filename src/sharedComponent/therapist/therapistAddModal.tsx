import { useState } from "react";
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import TherapistAddForm from './therapistAddForm';

const TherapistAddModal = (props: any) => {
  const { addTherapist, setTherapist } = props;
  return (
    <>
      <CModal scrollable visible={addTherapist} onClose={() => setTherapist(false)}>
        <CModalHeader>
          <CModalTitle>Add Therapist</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <TherapistAddForm setTherapist={setTherapist} />
        </CModalBody>
      </CModal>
    </>
  )
};

export default TherapistAddModal;
