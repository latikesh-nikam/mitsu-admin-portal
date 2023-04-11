import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { IModalProps } from './modal.types';

const BasicModalDialog: React.FC<IModalProps> = ({ children, open, setOpen, title }) => {
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width: 800, height: "fit-content" }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            {title}
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information.
          </Typography>
          {children}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

export default BasicModalDialog