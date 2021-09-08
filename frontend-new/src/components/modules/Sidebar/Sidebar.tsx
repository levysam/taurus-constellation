import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartArea,
  faObjectGroup,
  faStream,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
}) => {
  const history = useHistory();

  /**
   * Open page.
   */
  const openPage = useCallback((page: string) => {
    history.push(page);
  }, [history]);

  return (
    <div className={classnames(styles.sidebar, {
      [styles.collapsed]: collapsed,
    })}
    >
      <div className={styles.brand}>
        {collapsed ? 'TC' : 'Taurus Constellation'}
      </div>

      <div
        className={styles.item}
        onClick={() => { openPage('/'); }}
        onKeyDown={() => { openPage('/'); }}
        role="button"
        tabIndex={0}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faChartArea} />
        </span>
        <span className={styles.text}>
          Dashboard
        </span>
      </div>

      <div
        className={styles.item}
        onClick={() => { openPage('/groups'); }}
        onKeyDown={() => { openPage('/groups'); }}
        role="button"
        tabIndex={0}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faObjectGroup} />
        </span>
        <span className={styles.text}>
          Groups
        </span>
      </div>

      <div
        className={styles.item}
        onClick={() => { openPage('/queues'); }}
        onKeyDown={() => { openPage('/queues'); }}
        role="button"
        tabIndex={0}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faStream} />
        </span>
        <span className={styles.text}>
          Queues
        </span>
      </div>

      <div
        className={styles.item}
        onClick={() => { openPage('/users'); }}
        onKeyDown={() => { openPage('/users'); }}
        role="button"
        tabIndex={0}
      >
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <span className={styles.text}>
          Users
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
