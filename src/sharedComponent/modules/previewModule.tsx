import { CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from "@coreui/react";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Widget from "./previewModuleTree";

const PreviewModal = (props: any) => {
    const { showPreview, setPreview, modules} = props;
    return (
      <>
        <COffcanvas placement="end" visible={showPreview} onHide={() => setPreview(false)}>
          <COffcanvasHeader>
            <COffcanvasTitle>Preview Modules</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setPreview(false)} />
          </COffcanvasHeader>
          <COffcanvasBody>
            {/* <Widget /> */}
          </COffcanvasBody>
        </COffcanvas>
      </>
    )
};

export default PreviewModal;