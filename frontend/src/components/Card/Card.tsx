import React from 'react';
import styles from './styles.module.scss';

const CardHeader: React.FC = ({
  children,
}) => (
  <div className={styles.header}>
    {children}
  </div>
);

const CardTitle: React.FC = ({
  children,
}) => (
  <h2 className={styles.title}>
    {children}
  </h2>
);

const CardTools: React.FC = ({
  children,
}) => (
  <div className={styles.tools}>
    {children}
  </div>
);

const Card: React.FC = ({
  children,
}) => (
  <div className={styles.card}>
    {children}
  </div>
);

export { CardHeader, CardTitle, CardTools };
export default Card;
