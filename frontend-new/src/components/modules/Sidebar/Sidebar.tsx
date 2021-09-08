import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartArea,
  faCog,
  faStream,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
}) => (
  <div className={classnames(styles.sidebar, {
    [styles.collapsed]: collapsed,
  })}
  >
    <div className={styles.brand}>
      Taurus Constellation
    </div>

    <div className={styles.item}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faChartArea} />
      </span>
      <span className={styles.text}>
        Dashboard
      </span>
    </div>

    <div className={styles.item}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faStream} />
      </span>
      <span className={styles.text}>
        Queues
      </span>
    </div>

    <div className={styles.item}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faCog} />
      </span>
      <span className={styles.text}>
        Settings
      </span>
    </div>

    <div className={styles.item}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faUser} />
      </span>
      <span className={styles.text}>
        Users
      </span>
    </div>
  </div>
);

export default Sidebar;
