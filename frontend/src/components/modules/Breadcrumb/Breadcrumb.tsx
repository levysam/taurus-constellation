import React from 'react';
import { useHistory } from 'react-router-dom';
import BBreadcrumb from 'react-bootstrap/Breadcrumb';
import styles from './styles.module.scss';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
}) => {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <BBreadcrumb className={styles.breadcrumb}>
      {
        items.map((item) => (
          <BBreadcrumb.Item
            key={item.path}
            onClick={() => { history.push(item.path); }}
            active={item.path === pathname}
          >
            {item.label}
          </BBreadcrumb.Item>
        ))
      }
    </BBreadcrumb>
  );
};

export default Breadcrumb;
