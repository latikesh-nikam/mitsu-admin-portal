import { CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader } from '@coreui/react';
import React from 'react';
import { ICanvasProps } from './canvas.types';
import styles from "./canvas.module.scss";

const vars: any = {
  '--cui-offcanvas-width': "50%",
  '--cui-offcanvas-zindex': 1500,
  '--cui-offcanvas-box-shadow': "0 0.0625rem 0.125rem #1018280d",
  '--cui-offcanvas-backdrop-bg': "var(--joy-palette-background-backdrop, rgba(255 255 255 / 0.5))",
  '--cui-offcanvas-backdrop-opacity': "blur(8px)",
  '--cui-offcanvas-transition-duration': "0.5s",
}

const Canvas: React.FC<ICanvasProps> = ({ visible, setVisible, children, gridData }) => {
  return (
    <COffcanvas placement="end" scroll={true} visible={visible} onHide={() => setVisible(false)} className={styles.canvas}
      style={vars}>
      <COffcanvasHeader>
        <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        {children}
      </COffcanvasBody>
    </COffcanvas >
  )
}

export default Canvas