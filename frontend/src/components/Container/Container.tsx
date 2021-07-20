import React from 'react';
import { Container as GridContainer, ContainerProps } from 'react-grid-system';
import styles from './styles.module.scss';

const Container: React.FC<ContainerProps | any> = ({
  children,
  ...props
}) => (
  <GridContainer
    fluid
    className={styles.container}
    {...props}
  >
    {children}
  </GridContainer>
);

export default Container;
