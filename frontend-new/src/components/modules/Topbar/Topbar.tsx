import React from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../elements/Dropdown/Dropdown';
import { useAuth } from '../../../hooks/auth';
import { getFirstWord } from '../../../utils/stringUtils';
import styles from './styles.module.scss';

interface TopbarProps {
  collapsed: boolean;
  toggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  collapsed,
  toggle,
}) => {
  const history = useHistory();
  const { signOut, user } = useAuth();

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

      <Dropdown
        className={styles.profile}
        title={(
          <div className={styles.info}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className={styles.name}>
              {user ? getFirstWord(user.name) : 'User'}
            </span>
          </div>
        )}
        options={[
          {
            label: 'My account',
            onClick: () => { history.push('/account'); },
          },
          {
            label: 'divider',
            isDivider: true,
          },
          {
            label: 'Sign out',
            onClick: () => {
              signOut();
              history.push('/');
            },
          },
        ]}
      />
    </div>
  );
};

export default Topbar;
