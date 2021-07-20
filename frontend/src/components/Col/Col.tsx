import React from 'react';
import { Col as GridCol, ColProps } from 'react-grid-system';
import styles from './styles.module.scss';

const Col: React.FC<ColProps | any> = ({
  children,
  ...props
}) => (
  <GridCol
    className={styles.col}
    {...props}
  >
    {children}
  </GridCol>
);

export default Col;
