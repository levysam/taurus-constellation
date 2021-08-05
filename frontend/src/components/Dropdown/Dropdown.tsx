import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface DropdownOption {
  label: string;
  onClick?: (...args: any[]) => void;
}

interface DropdownProps {
  options: DropdownOption[];
  title: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggle = (): void => {
    setExpanded(!expanded);
  };

  const select = (option: DropdownOption): void => {
    toggle();
    if (option.onClick) {
      option.onClick();
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={styles.title}
        onClick={toggle}
        onKeyDown={toggle}
        role="button"
        tabIndex={0}
      >
        <span className={styles.label}>
          {title}
        </span>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className={classnames(styles.list, {
        [styles.expanded]: expanded,
      })}
      >
        {
        options.map((option, index) => (
          <div
            key={option.label}
            className={styles.option}
            onClick={() => { select(option); }}
            onKeyDown={() => { select(option); }}
            role="button"
            tabIndex={index + 1}
          >
            {option.label}
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Dropdown;
