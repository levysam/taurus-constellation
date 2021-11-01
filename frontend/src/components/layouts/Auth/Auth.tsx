import React from 'react';
import styles from './styles.module.scss';
import wavesImg from '../../../assets/waves.svg';

const Auth: React.FC = ({
  children,
}) => (
  <div className={styles.screen}>
    <div className={styles.waves}>
      <img src={wavesImg} alt="waves" />
    </div>
    <div className={styles.main}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </div>
);

export default Auth;
