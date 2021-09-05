import React from 'react';
import BFormControl, { FormControlProps as BTextareaProps } from 'react-bootstrap/FormControl';
import styles from './styles.module.scss';

const Textarea: React.FC<BTextareaProps & React.HTMLProps<HTMLTextAreaElement>> = ({
  ...props
}) => (
  <BFormControl
    className={styles.textarea}
    as="textarea"
    rows={3}
    {...props}
  />
);

export default Textarea;
