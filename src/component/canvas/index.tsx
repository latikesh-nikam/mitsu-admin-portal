import { CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react';
import React from 'react';
import { ICanvasProps } from './canvas.types';

const Canvas: React.FC<ICanvasProps> = ({ visible, setVisible, children, gridData }) => {

  return (
    <COffcanvas placement="end" scroll={true} visible={visible} onHide={() => setVisible(false)} style={{ width: '50%' }}>
      <COffcanvasHeader>
        <COffcanvasTitle>{gridData.title}</COffcanvasTitle>
        <COffcanvasTitle>Select Program Modules-</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        {children}
      </COffcanvasBody>
    </COffcanvas>
  )
}

export default Canvas