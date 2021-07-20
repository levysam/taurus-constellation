import React from 'react';
import { Row as GridRow, RowProps } from 'react-grid-system';

const Row: React.FC<RowProps | any> = ({
  children,
}) => (
  <GridRow>
    {children}
  </GridRow>
);

export default Row;
