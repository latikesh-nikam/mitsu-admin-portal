import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import ControlledCheckbox from './moduleCheckBox';

const ModuleAddModal = (props: any) => {
  const { showModal, setModal, modules, moduleIds, setModuleIds, title, assignModules, disabled} = props;
  return (
    <>
      <CModal scrollable visible={showModal} onClose={() => setModal(!showModal)}>
        <CModalHeader>
          <CModalTitle>Select Modules to add in {title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {modules?.map((item: any, index: number) => (
           <div style={{display: 'flex'}}>
            <ControlledCheckbox
                moduleDetails={item}
                moduleIds={moduleIds} 
                setModuleIds={setModuleIds}
            />
            &nbsp;<div style={{paddingTop: '0.5rem'}}>{item.name}</div>
           </div> 
        ))} 
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => assignModules()} disabled={disabled}>
            Add Modules
          </CButton>
          <CButton color="dark" onClick={() => setModal(!showModal)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
};

export default ModuleAddModal;
