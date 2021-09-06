import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface ModalProps {
  title: string;
  footer: React.ReactNode;
  show: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  footer,
  show,
  children,
}) => (
  <div className={classnames(styles.modal, {
    [styles.show]: show,
  })}
  >
    <div className={styles.content}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title}
        </h2>
      </div>
      <div className={styles.body}>
        {children}
      </div>
      <div className={styles.footer}>
        {footer}
      </div>
    </div>
  </div>
);

export default Modal;
