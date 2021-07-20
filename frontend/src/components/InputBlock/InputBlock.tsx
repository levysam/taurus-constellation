import React from 'react';
import styles from './styles.module.scss';

interface InputBlockProps {
  required?: boolean;
  label?: string;
  error?: string;
}

const InputBlock: React.FC<InputBlockProps> = ({
  children,
  required = false,
  label,
  error,
}) => (
  <div className={styles.inputBlock}>
    <div className={styles.label}>
      {
        label
        && <span>{label}</span>
      }
      {
        required
        && <div className={styles.required} />
      }
    </div>
    {children}
    {
      error
      && <span className={styles.error}>{error}</span>
    }
  </div>
);

export default InputBlock;
