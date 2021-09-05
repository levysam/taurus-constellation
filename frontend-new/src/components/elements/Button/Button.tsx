import React from 'react';
import BButton, { ButtonProps as BButtonProps } from 'react-bootstrap/Button';
import styles from './styles.module.scss';

const Button: React.FC<BButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <BButton
    className={`${styles.button} ${className}`}
    {...props}
  >
    {children}
  </BButton>
);

export default Button;
