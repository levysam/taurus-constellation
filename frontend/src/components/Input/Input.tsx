import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

export interface InputEvent {
  name: string;
  value: string;
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  hasError?: boolean;
  handleInput?: (event: InputEvent) => void;
}

const Input: React.FC<InputProps> = ({
  hasError = false,
  handleInput,
  ...props
}) => {
  const onInput = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (!handleInput) {
      return;
    }
    const { name, value } = event.currentTarget;
    handleInput({
      name,
      value,
    });
  };

  return (
    <input
      className={classnames(styles.input, {
        [styles.error]: hasError,
      })}
      onInput={onInput}
      {...props}
    />
  );
};

export default Input;
