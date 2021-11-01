import React from 'react';
import BButtonGroup, { ButtonGroupProps as BButtonGroupProps } from 'react-bootstrap/ButtonGroup';
import styles from './styles.module.scss';

const ButtonGroup: React.FC<BButtonGroupProps> = ({
  children,
  ...props
}) => (
  <BButtonGroup
    className={styles.buttonGroup}
    {...props}
  >
    {children}
  </BButtonGroup>
);

export default ButtonGroup;
