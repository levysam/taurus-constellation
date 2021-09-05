import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  variant?: 'default' | 'primary' | 'green' | 'red';
  type: 'button' | 'submit' | 'reset' | undefined;
  size?: 'sm';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  type,
  size,
  ...props
}) => (
  <button
    className={classnames(styles.button, {
      [styles.default]: variant === 'default',
      [styles.primary]: variant === 'primary',
      [styles.green]: variant === 'green',
      [styles.red]: variant === 'red',
      [styles.small]: size === 'sm',
    })}
    type={type}
    {...props}
  >{children}
  </button>
);

export default Button;
