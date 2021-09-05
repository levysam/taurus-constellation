import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faIdCard,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from './styles.module.scss';

interface TopbarProps {
  collapsed: boolean;
  toggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  collapsed,
  toggle,
}) => {
  const [actionsOpen, setActionsOpen] = useState(false);

  const toggleActions = (): void => {
    setActionsOpen(!actionsOpen);
  };

  return (
    <div className={classnames(styles.topbar, {
      [styles.collapsed]: collapsed,
    })}
    >
      <a
        className={styles.toggler}
        onClick={toggle}
        onKeyDown={toggle}
        role="button"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faBars} />
      </a>

      <div
        role="button"
        tabIndex={0}
        className={styles.profile}
        onClick={toggleActions}
        onKeyDown={toggleActions}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span className={styles.name}>
          Pedro
        </span>
      </div>

      {
        actionsOpen
        && (
        <div className={styles.profileActions}>
          <div className={styles.option}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faIdCard} />
            </span>
            <span className={styles.text}>
              My Account
            </span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            <span className={styles.text}>
              Sign Out
            </span>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default Topbar;
