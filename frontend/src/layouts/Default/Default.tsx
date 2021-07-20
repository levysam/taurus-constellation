import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const Default: React.FC = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);

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
        <div className={styles.topbar}>
          <Topbar collapsed={collapsed} toggle={toggle} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Default;
