import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Topbar from '../../modules/Topbar/Topbar';
import Sidebar from '../../modules/Sidebar/Sidebar';

const Default: React.FC = ({
  children,
}) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const sidebarCollapsed = localStorage.getItem('@TaurusConstellation:sidebarCollapsed');
    const value = sidebarCollapsed === '1';
    setCollapsed(value);
  }, [history]);

  useEffect(() => {
    const value = collapsed ? '1' : '0';
    localStorage.setItem('@TaurusConstellation:sidebarCollapsed', value);
  }, [collapsed]);

  const toggle = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.screen}>
      <div className={classnames(styles.sidebar, {
        [styles.collapsed]: collapsed,
      })}
      >
        <Sidebar collapsed={collapsed} />
      </div>
      <div className={styles.main}>
        <div className={classnames(styles.topbar, {
          [styles.collapsed]: collapsed,
        })}
        >
          <Topbar
            collapsed={collapsed}
            toggle={toggle}
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Default;
