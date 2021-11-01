import React from 'react';
import classnames from 'classnames';
import BFormControl, { FormControlProps as BTextareaProps } from 'react-bootstrap/FormControl';
import styles from './styles.module.scss';

type DefaultProps = BTextareaProps & React.HTMLProps<HTMLTextAreaElement>;

interface TextareaProps extends DefaultProps{
  hasError?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  hasError,
  ...props
}) => (
  <BFormControl
    className={classnames(styles.textarea, {
      [styles.error]: hasError,
    })}
    as="textarea"
    {...props}
  />
);

export default Textarea;
