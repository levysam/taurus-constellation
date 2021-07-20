import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import wavesImg from '../../assets/images/waves.svg';

const Auth: React.FC = () => (
  <div className={styles.screen}>
    <div className={styles.card}>
      <img src={wavesImg} alt="waves" />
      <div className={styles.content}>
        <h2 className={styles.title}>
          Taurus Constellation
        </h2>
        <form>
          <div className={styles.inputBlock}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.inputBlock}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="button">
            Enter
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default Auth;
