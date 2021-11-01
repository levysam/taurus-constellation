import React from 'react';
import styles from './styles.module.scss';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  tools?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  tools,
}) => (
  <div className={styles.pageHeader}>
    <div className={styles.title}>
      <h2>
        {title}
      </h2>
      {
        !!subtitle && (
          <span>
            {subtitle}
          </span>
        )
      }
    </div>
    <div className={styles.tools}>
      {tools}
    </div>
  </div>
);

export default PageHeader;
