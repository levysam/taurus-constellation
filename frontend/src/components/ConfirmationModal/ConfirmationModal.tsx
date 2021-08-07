import React from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  title,
  children,
  onConfirm,
  onCancel,
}) => (
  <Modal
    show={show}
    title={title}
    footer={(
      <div>
        <Button
          type="button"
          variant="default"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
      )}
  >
    {children}
  </Modal>
);

export default ConfirmationModal;
