import React from 'react';
import styles from './styles.module.scss';

interface PageHeaderProps {
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
}) => (
  <div className={styles.pageHeader}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.actions}>
      {children}
    </div>
  </div>
);

export default PageHeader;
