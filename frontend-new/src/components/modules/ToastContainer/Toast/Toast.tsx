import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { ToastMessage, useToast } from '../../../../hooks/toast';
import styles from './styles.module.scss';

interface ToastProps {
  message: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({
  message,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message.id, removeToast]);

  return (
    <div className={classNames(styles.container, {
      [styles.success]: message.type === 'success',
      [styles.error]: message.type === 'error',
    })}
    >
      <strong>{message.title}</strong>
      {
        message.description
        && (
          <p>{message.description}</p>
        )
      }
      <button
        type="button"
        onClick={() => { removeToast(message.id); }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Toast;
