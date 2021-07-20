import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({
  hasError = false,
  ...props
}) => (
  <input
    className={classnames(styles.input, {
      [styles.error]: hasError,
    })}
    {...props}
  />
);

export default Input;
