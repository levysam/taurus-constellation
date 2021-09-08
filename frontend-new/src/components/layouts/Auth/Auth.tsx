import React from 'react';
import styles from './styles.module.scss';

const Auth: React.FC = ({
  children,
}) => (
  <div className={styles.screen}>
    <div className={styles.main}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </div>
);

export default Auth;
