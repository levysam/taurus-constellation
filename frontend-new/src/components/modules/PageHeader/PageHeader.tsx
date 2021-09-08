import React from 'react';
import styles from './styles.module.scss';

interface PageHeaderProps {
  title: string;
  tools?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  tools,
}) => (
  <div className={styles.pageHeader}>
    <h2 className={styles.title}>
      {title}
    </h2>
    <div className={styles.tools}>
      {tools}
    </div>
  </div>
);

export default PageHeader;
