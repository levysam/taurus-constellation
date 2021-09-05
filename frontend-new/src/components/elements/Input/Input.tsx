import React from 'react';
import classnames from 'classnames';
import BInput, { FormControlProps as BInputProps } from 'react-bootstrap/FormControl';
import styles from './styles.module.scss';

type DefaultProps = BInputProps & React.HTMLProps<HTMLInputElement>;

interface InputProps extends DefaultProps {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({
  hasError,
  ...props
}) => (
  <BInput
    className={classnames(styles.input, {
      [styles.error]: hasError,
    })}
    {...props}
  />
);

export default Input;
