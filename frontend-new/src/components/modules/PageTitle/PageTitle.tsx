import React from 'react';
import styles from './styles.module.scss';

interface PageTitleProps {
  className: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  className,
}) => (
  <h2
    className={`${styles.pageTitle} ${className}`}
  >
    {children}
  </h2>
);

export default PageTitle;
