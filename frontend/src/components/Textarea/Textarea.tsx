import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  hasError = false,
  ...props
}) => (
  <textarea
    className={classnames(styles.textarea, {
      [styles.error]: hasError,
    })}
    {...props}
  />
);

export default Textarea;
