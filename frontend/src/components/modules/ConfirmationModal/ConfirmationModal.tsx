import React from 'react';
import Button from '../../elements/Button/Button';
import Modal from '../Modal/Modal';
import styles from './styles.module.scss';

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
      <div className={styles.actions}>
        <Button
          type="button"
          variant="primary"
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button
          type="button"
          variant="dark"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
      )}
  >
    {children}
  </Modal>
);

export default ConfirmationModal;
