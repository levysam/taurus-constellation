import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps {
  variant?: 'default' | 'primary' | 'green' | 'red';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
}) => (
  <button
    type="button"
    className={classnames(styles.button, {
      [styles.default]: variant === 'default',
      [styles.primary]: variant === 'primary',
      [styles.green]: variant === 'green',
      [styles.red]: variant === 'red',
    })}
  >{children}
  </button>
);

export default Button;
