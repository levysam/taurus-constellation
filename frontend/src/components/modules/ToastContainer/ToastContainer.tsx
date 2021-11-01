import React from 'react';
import { ToastMessage } from '../../../hooks/toast';
import Toast from './Toast/Toast';
import styles from './styles.module.scss';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  messages,
}) => (
  <div className={styles.container}>
    {
      messages.map((message) => (
        <Toast
          key={message.id}
          message={message}
        />
      ))
    }
  </div>
);

export default ToastContainer;
